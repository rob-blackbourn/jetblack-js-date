import { startOfYear } from './startOfYear'
import { diffInCalDays } from './diffInCalDays'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the day of the year.
 *
 * @example
 *
 * ```js
 * const d = new Date('2020-07-12T00:00:00Z')
 * const day = dayOfYear(d, tzUtc)
 * console.log(day)
 * // 94
 * ```
 *
 * @param date The date
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The day of the year
 */
export function dayOfYear(date: Date, tz: Timezone = tzLocal): number {
  const diff = diffInCalDays(date, startOfYear(date, tz), tz)
  const dayOfYear = diff + 1
  return dayOfYear
}
