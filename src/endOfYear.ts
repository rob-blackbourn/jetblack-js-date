import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the last moment of the year.
 *
 * ```js
 * const d1 = endOfYear(new Date('2000-01-01T00:00:00Z'), tzUtc)
 * console.log(d1.toISOString())
 * // 2000-12-31T23:59:59.999Z
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
