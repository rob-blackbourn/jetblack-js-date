/**
 * Checks if the left date is on or after the right date.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is on or after the right date, otherwise false.
 */
export function isDateOnOrAfter(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() >= rhs.getTime()
}
