/**
 * Checks if the dates are equal.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date equals the right date, otherwise false.
 */
export function isDateEqual(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() === rhs.getTime()
}
