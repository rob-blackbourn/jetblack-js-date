import { MILLISECONDS_IN_DAY } from './constants'
import { leapSeconds } from './leapSeconds'

/**
 * Find the number of milliseconds between two dates.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @returns The number of days milliseconds between the left and right date.
 */
export function diffInMilliseconds(leftDate: Date, rightDate: Date) {
  const elapsedTime =
    leftDate.getTime() -
    rightDate.getTime() +
    leapSeconds(leftDate, rightDate) * 1000
  return elapsedTime
}
