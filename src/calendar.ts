/**
 * The base class for calendars.
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
