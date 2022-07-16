import { MILLISECONDS_IN_DAY } from './constants'
import { diffInMilliseconds } from './diffInMilliseconds'

/**
 * Find the number of days between two dates including the fractional component.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInDays(leftDate: Date, rightDate: Date) {
  const elapsedTime = diffInMilliseconds(leftDate, rightDate)
  return elapsedTime / MILLISECONDS_IN_DAY
}
