import { addDays } from './arithmetic'
import { Timezone, tzLocal } from './timezone'

export abstract class Calendar {
  #name: string

  constructor(name: string) {
    this.#name = name
  }

  get name(): string {
    return this.#name
  }

  abstract isHoliday(date: Date): boolean
}

export class WeekendCalendar extends Calendar {
  weekends: number[]

  constructor(name: string = 'WeekendCalendar', weekends: number[] = [0, 6]) {
    super(name)
    this.weekends = weekends
  }

  isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay()
    return this.weekends.some(x => x === dayOfWeek)
  }

  isHoliday(date: Date): boolean {
    return this.isWeekend(date)
  }
}

export const calWeekends = new WeekendCalendar()

export class HolidayCalendar extends WeekendCalendar {
  #holidays: Set<number>

  constructor(name: string, weekends: number[] = [0, 6], holidays: Date[]) {
    super(name, weekends)
    this.#holidays = new Set(holidays.map(x => x.getTime()))
  }

  isHoliday(date: Date): boolean {
    return this.isWeekend(date) || this.#holidays.has(date.getTime())
  }
}

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
