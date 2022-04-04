/**
 * Find the largest date.
 *
 * @category Comparisons
 *
 * @param dates The dates to check.
 * @returns The largest date.
 */
export function maxDate(...dates: Date[]): Date {
  if (dates.length === 0) {
    throw new RangeError('no dates')
  }

  let largest = dates[0]
  for (let i = 1; i < dates.length; ++i) {
    if (dates[i] > largest) {
      largest = dates[i]
    }
  }
  return largest
}
