/**
 * Check if the year is a leap year.
 *
 * @category Calendars
 *
 * @param year The year.
 * @returns True if the year is a leap year, otherwise false.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}
