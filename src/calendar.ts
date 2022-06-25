/**
 * The base class for calendars.
 *
 * Calendars are required when working with functions that require
 * knowledge of weekends and holidays (e.g. {@link addBusinessDays}).
 *
 * There is a tutorial [here](../../pages/guide/calendars.html).
 *
 * Two calendars are classes are defined: {@link WeekendCalendar} and
 * {@link HolidayCalendar}. The object {@link calWeekends} is the
 * default calendar. It simply defines Saturday and Sunday as holiday
 * dates.
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
   * @returns True if the date is a holiday, otherwise false.
   */
  abstract isHoliday(date: Date): boolean
}
