import { isLeapYear } from './isLeapYear'

/**
 * Find the number of days in a year.
 *
 * * @category Calendars
 *
 * @param year The year.
 * @returns The number of days in the year.
 */
export function daysInYear(year: number): number {
  return isLeapYear(year) ? 366 : 365
}
