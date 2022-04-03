import { addDays } from './arithmetic'
import { Timezone, tzLocal } from './timezone'

/**
 * The base class for calendars.
 */
export abstract class Calendar {
  /** @hidden */
  #name: string

  /**
   * The name of the calendar.
   *
   * @param name The calendar name.
   */
  constructor(name: string) {
    this.#name = name
  }

  /**
   * Get the calendar name.
   */
  get name(): string {
    return this.#name
  }

  /**
   * Check if the date is a holiday.
   *
   * @param date The date.
   * @returns True if the date is a holiday, otherwise false.
   */
  abstract isHoliday(date: Date): boolean
}

/**
 * A calendar where specific days of the week are considered holidays.
 */
export class WeekendCalendar extends Calendar {
  /** @hidden */
  #weekends: number[]

  /**
   *Construct a weekend calendar.

   * @param name An optional calendar name.
   * @param weekends An optional array of week days. Defaults to `[0, 6]` for Saturday and Sunday.
   */
  constructor(name: string = 'WeekendCalendar', weekends: number[] = [0, 6]) {
    super(name)
    this.#weekends = weekends
  }

  /**
   * Check if the date is a weekend.
   *
   * @param date The date.
   * @returns True is the date is a weekend, otherwise false.
   */
  isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay()
    return this.#weekends.some(x => x === dayOfWeek)
  }

  isHoliday(date: Date): boolean {
    return this.isWeekend(date)
  }
}

/**
 * The default calendar where Saturday and Sunday are considered holidays.
 */
export const calWeekends = new WeekendCalendar()

/**
 * A calendar class which supports weekends and an array of arbitrary dates.
 */
export class HolidayCalendar extends WeekendCalendar {
  /** @ignore */
  #holidays: Set<number>

  /**
   * Construct a holiday calendar.
   *
   * @param name The calendar name.
   * @param weekends An array of weekdays which are always holidays.
   * @param holidays An array of dates which are holidays.
   */
  constructor(name: string, weekends: number[] = [0, 6], holidays: Date[]) {
    super(name, weekends)
    this.#holidays = new Set(holidays.map(x => x.getTime()))
  }

  isHoliday(date: Date): boolean {
    return this.isWeekend(date) || this.#holidays.has(date.getTime())
  }
}

/**
 * Add business days to a date (or subtract if negative).
 *
 * @param date The start date.
 * @param count The number of days to add (or subtract if negative).
 * @param cal The calendar to use to identify dates which are holidays.
 * @param tz An optional timezone. Defaults to `tzLocal`.
 * @returns A new date adjusted by business days.
 */
export function addBusinessDays(
  date: Date,
  count: number,
  cal: Calendar = calWeekends,
  tz: Timezone = tzLocal
): Date {
  const sign = count > 0 ? 1 : -1

  while (count !== 0) {
    date = addDays(date, sign, tz)
    count -= sign

    while (cal.isHoliday(date)) {
      date = addDays(date, sign, tz)
    }
  }
  return date
}

/**
 * Find the nearest business date.
 *
 * @param date The start date.
 * @param preferForward If true a future date is preferred if both directions have the same cost. Defaults to true.
 * @param cal The calendar to use to identify business days. Defaults to the weekend calendar.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The nearest business date.
 */
export function nearestBusinessDay(
  date: Date,
  preferForward: boolean = true,
  cal: Calendar = calWeekends,
  tz: Timezone = tzLocal
): Date {
  if (!cal.isHoliday(date)) {
    return date
  }
  let forwardDate = addDays(date, 1, tz)
  let backwardDate = addDays(date, -1, tz)

  while (true) {
    const isForwardHoliday = cal.isHoliday(forwardDate)
    const isBackwardHoliday = !cal.isHoliday(backwardDate)
    if (!isForwardHoliday && (preferForward || isBackwardHoliday)) {
      return forwardDate
    } else if (!isBackwardHoliday) {
      return backwardDate
    }
    forwardDate = addDays(forwardDate, 1, tz)
    backwardDate = addDays(backwardDate, -1, tz)
  }
}
