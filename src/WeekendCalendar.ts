import { Calendar } from './Calendar'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * A calendar where specific days of the week are considered holidays.
 *
 * @category Calendars
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
   * @param tz An optional timezone. Defaults to the local timezone.
   * @returns True is the date is a weekend, otherwise false.
   */
  isWeekend(date: Date, tz: Timezone = tzLocal): boolean {
    const dayOfWeek = tz.weekday(date)
    return this.#weekends.some(x => x === dayOfWeek)
  }

  isHoliday(date: Date, tz: Timezone = tzLocal): boolean {
    return this.isWeekend(date, tz)
  }
}

/**
 * The default calendar where Saturday and Sunday are considered holidays.
 *
 * @Category Calendars
 */
export const calWeekends = new WeekendCalendar()
