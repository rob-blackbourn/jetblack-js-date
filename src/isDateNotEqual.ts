/**
 * Checks if the dates are not equal.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the dates are not equal, otherwise false.
 */
export function isDateNotEqual(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() !== rhs.getTime()
}
