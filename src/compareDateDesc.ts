/**
 * Compares two dates descending.
 *
 * @category Comparisons
 *
 * @param a The first date.
 * @param b The second date.
 * @returns 1 if the second date is greater than the first date, -1 if the second date is less than the first date, otherwise 0.
 */
export function compareDateDesc(a: Date, b: Date): number {
  return Math.sign(b.getTime() - a.getTime())
}
