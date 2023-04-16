import { tzLocal } from './LocalTimezone'
import { startOfYear } from './startOfYear'
import { Timezone } from './Timezone'
import { MILLISECONDS_IN_DAY } from './constants'

/**
 * Find the week of the year for a given date.
 *
 * Weeks start on 1 January of any given year.
 *
 * ```js
 * console.log(weekOfYear(new Date('1999-12-31T00:00:00Z'), tzUtc))
 * // 53
 * console.log(weekOfYear(new Date('2000-01-01T00:00:00Z'), tzUtc))
 * // 1
 * console.log(weekOfYear(new Date('2000-01-07T00:00:00Z'), tzUtc))
 * // 1
 * console.log(weekOfYear(new Date('2000-01-08T00:00:00Z'), tzUtc))
 * // 2
 * console.log(weekOfYear(new Date('2000-12-31T00:00:00Z'), tzUtc))
 * // 53
 * ```
 *
 * @category Miscellaneous
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The week of the year.
 */
export function weekOfYear(date: Date, tz: Timezone = tzLocal): number {
  const jan1 = startOfYear(date, tz)
  const daysBetween = (date.getTime() - jan1.getTime()) / MILLISECONDS_IN_DAY
  return 1 + Math.trunc(daysBetween / 7)
}
