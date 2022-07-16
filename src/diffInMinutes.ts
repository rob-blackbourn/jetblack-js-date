import { MILLISECONDS_IN_MINUTE } from './constants'
import { diffInMilliseconds } from './diffInMilliseconds'

/**
 * Find the number of minutes between two dates including fractional seconds.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInMinutes(leftDate: Date, rightDate: Date) {
  const elapsedTime = diffInMilliseconds(leftDate, rightDate)
  return elapsedTime / MILLISECONDS_IN_MINUTE
}
