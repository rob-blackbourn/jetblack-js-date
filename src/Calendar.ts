import { Timezone } from './Timezone'

/**
 * The base class for calendars.
 *
 * @remarks
 *
 * Calendars are required when working with functions that require
 * knowledge of weekends and holidays (e.g. {@link addBusinessDays}).
 *
 * There is a tutorial [here](../../pages/guide/calendars.html).
 *
 * Two calendar classes are defined: {@link WeekendCalendar} and
 * {@link HolidayCalendar}. The object {@link calWeekends} is the
 * default calendar. It simply defines Saturday and Sunday as holiday
 * dates.
 *
 * This is how the {@link WeekendCalendar} is defined.
 *
 * @example
 *
 * ```ts
 * export class WeekendCalendar extends Calendar {
 *   #weekends: number[]
 *
 *   constructor(name: string = 'WeekendCalendar', weekends: number[] = [0, 6]) {
 *     super(name)
 *     this.#weekends = weekends
 *   }
 *
 *   isWeekend(date: Date): boolean {
 *     const dayOfWeek = date.getDay()
 *     return this.#weekends.some(x => x === dayOfWeek)
 *   }
 *
 *   isHoliday(date: Date): boolean {
 *     return this.isWeekend(date)
 *   }
 * }
 * ```
 *
 * @category Calendars
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
   * @param tz An optional timezone. Defaults to the local timezone.
   * @returns True if the date is a holiday, otherwise false.
   */
  abstract isHoliday(date: Date, tz: Timezone): boolean
}
