import { isLeapYear } from './isLeapYear'

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * Find the number of days in a month for a given year.
 *
 * @category Calendars
 *
 * @param year The year.
 * @param monthIndex The month index where January is 0.
 * @returns The number of days in the month for the given year.
 */
export function daysInMonth(year: number, monthIndex: number): number {
  return isLeapYear(year) && monthIndex === 1 ? 29 : MONTH_DAYS[monthIndex]
}
