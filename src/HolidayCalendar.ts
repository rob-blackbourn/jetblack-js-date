import { WeekendCalendar } from './WeekendCalendar'

/**
 * A calendar class which supports weekends and an array of arbitrary dates.
 *
 * @category Calendars
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
