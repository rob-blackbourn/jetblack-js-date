/**
 * Find the quarter for a given date.
 *
 * @category Calendars
 *
 * @param date The date.
 * @returns The quarter of the year.
 */
export function quarterOfYear(date: Date): number {
  return 1 + Math.trunc(date.getMonth() / 4)
}
