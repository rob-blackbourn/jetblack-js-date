import { MILLISECONDS_IN_MINUTE } from './constants'

/**
 * Return the end of the minute for the given date.
 *
 * ```js
 * const d1 = tzUtc.makeDate(2000, 1, 1)
 * const d2 = endOfMinute(d1, tzUtc)
 * console.log(d2.toISOString())
 * // 2000-02-01T00:00:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param date The start date.
 * @returns A new date which is the end of the minute.
 */
export function endOfMinute(date: Date): Date {
  return new Date(
    Math.trunc(date.getTime() / MILLISECONDS_IN_MINUTE) *
      MILLISECONDS_IN_MINUTE +
      MILLISECONDS_IN_MINUTE -
      1
  )
}
