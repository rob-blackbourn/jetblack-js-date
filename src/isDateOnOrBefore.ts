/**
 * Checks if the left date is on or before the right date.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is on or before the right date, otherwise false.
 */
export function isDateOnOrBefore(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() <= rhs.getTime()
}
