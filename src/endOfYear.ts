import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the last moment of the year.
 *
 * ```js
 * import { endOfYear, tzUtc } from '@jetblack/date'
 *
 * const days1 = endOfYear(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days1.toISOString())
 * // 2022-12-31T23:59:59.999Z
 *
 * // Compare with lastDayOfYear.
 * const days2 = lastDayOfYear(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days2.toISOString())
 * // 2022-12-31T00:00:00.000Z
 * ```
 *
 * @category Anchors
 *
 * @param date A date
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The last moment of the year.
 */
export function endOfYear(date: Date, tz: Timezone = tzLocal): Date {
  return tz.makeDate(tz.year(date), 11, 31, 23, 59, 59, 999)
}
