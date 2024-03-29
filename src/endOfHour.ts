import { MILLISECONDS_IN_HOUR } from './constants'

/**
 * Return the end of the hour for the given date.
 *
 * ```js
 * import { endOfHour, tzUtc } from '@jetblack/date'
 *
 * const d1 = tzUtc.makeDate(2000, 1, 1)
 * const d2 = endOfHour(d1, tzUtc)
 * console.log(d2.toISOString())
 * // 2000-02-01T00:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param date The start date.
 * @returns A new date which is the end of the hour.
 */
export function endOfHour(date: Date): Date {
  return new Date(
    Math.trunc(date.getTime() / MILLISECONDS_IN_HOUR) * MILLISECONDS_IN_HOUR +
      MILLISECONDS_IN_HOUR -
      1
  )
}
