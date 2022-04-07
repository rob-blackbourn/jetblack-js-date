/**
 * Compares two dates ascending.
 *
 * @category Comparisons
 *
 * @param a The first date.
 * @param b The second date.
 * @returns 1 if the first date is greater than the second date, -1 if the first date is less than the last date, otherwise 0.
 */
export function compareDateAsc(a: Date, b: Date): number {
  return Math.sign(b.getTime() - a.getTime())
}
