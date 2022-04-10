import { DatePartRequest, DatePartResponse } from './types'
import { padNumber } from './utils'

/**
 * The base class for timezones.
 *
 * @category Timezone
 */
export abstract class Timezone {
  /** @ignore */
  #name: string

  /**
   * Construct a new timezone.
   *
   * @param name The timezone name.
   */
  constructor(name: string) {
    this.#name = name
  }

  /**
   * Get the name of the timezone.
   */
  get name(): string {
    return this.#name
  }

  /**
   * Create a date from its component parts.
   *
   * @param year The year.
   * @param monthIndex The month index where January is 0.
   * @param day The day of the month.
   * @param hours The hour of the day.
   * @param minutes The minute of the day.
   * @param seconds The second of the day.
   * @param milliseconds The millisecond of the day.
   * @returns A new date built from the parts.
   */
  abstract makeDate(
    year: number,
    monthIndex: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ): Date

  /**
   * Extract the date parts.
   *
   * The request object sets the parts of the response to be calculated.
   *
   * ```js
   * // Only get the year, monthIndex and day.
   * const { year, monthIndex, day } = tz.dateParts(date, {
   *   year: true,
   *   monthIndex: true,
   *   day: true
   * })
   * ```
   *
   * @param date The date.
   * @param request The request.
   * @returns The date parts.
   */
  abstract dateParts(date: Date, request: DatePartRequest): DatePartResponse

  /**
   * The signed offset in minutes from UTC for the given date.
   *
   * @param date The date.
   */
  abstract offset(date: Date): number

  /**
   * The year for the date.
   *
   * @param date The date.
   * @returns The year.
   */
  abstract year(date: Date): number

  /**
   * The month index for the given date where 0 is January.
   *
   * @param date The date.
   * @returns The month index of the date where 0 is January.
   */
  abstract monthIndex(date: Date): number

  /**
   * The day of the week for the given date where 0 is Sunday.
   *
   * @param date The date.
   * @returns The day of the week where 0 is Sunday.
   */
  abstract weekday(date: Date): number

  /**
   * The day of the month for the given date.
   *
   * @param date The date.
   * @returns The day of the month.
   */
  abstract day(date: Date): number

  /**
   * The hour of the day for the given date.
   *
   * @param date The date.
   * @returns The hour of the day.
   */
  abstract hours(date: Date): number

  /**
   * The minute of the day for the given date.
   *
   * @param date The date.
   * @returns The minute of the day.
   */
  abstract minutes(date: Date): number

  /**
   * The second of the day for a given date.
   *
   * @param date The date.
   * @returns The second of the day.
   */
  abstract seconds(date: Date): number

  /**
   * The millisecond of the day for a given date.
   *
   * @param date The date.
   * @returns The milliseconds of the day.
   */
  abstract milliseconds(date: Date): number

  /**
   * Find if the date was subject to daylight savings time.
   *
   * @param date The date.
   * @returns True if the date was subject to daylight savings time.
   */
  abstract isDaylightSavings(date: Date): boolean

  /**
   * The ISO 8601 date string representation for a given date.
   *
   * @param date The date.
   * @returns The ISO date string.
   */
  toISOString(date: Date) {
    const { year, monthIndex, day, hours, minutes, seconds, milliseconds } =
      this.dateParts(date, {
        year: true,
        monthIndex: true,
        day: true,
        hours: true,
        minutes: true,
        seconds: true,
        milliseconds: true
      })
    const offset = this.offset(date)
    const offsetSign = Math.sign(offset)
    const offsetHours = offsetSign * Math.trunc(offset / 60)
    const offsetMinutes = offsetSign * (offset % 60)

    const datePart =
      padNumber(year, 4) +
      '-' +
      padNumber(monthIndex + 1, 2) +
      '-' +
      padNumber(day, 2)
    const timePart =
      padNumber(hours, 2) +
      ':' +
      padNumber(minutes, 2) +
      ':' +
      padNumber(seconds, 2) +
      (milliseconds !== 0 ? '.' + padNumber(milliseconds, 3) : '')
    const offsetPart =
      (offsetSign === -1 ? '-' : '+') +
      padNumber(offsetHours, 2) +
      ':' +
      padNumber(offsetMinutes, 2)
    return datePart + 'T' + timePart + offsetPart
  }
}
