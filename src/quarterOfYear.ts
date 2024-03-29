import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the quarter for a given date.
 *
 * ```js
 * import { quarterOfYear } from '@jetblack/date'
 *
 * console.log(quarterOfYear(new Date('2000-04-01')))
 * // 2
 * ```
 *
 * @category Calendars
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The quarter of the year.
 */
export function quarterOfYear(date: Date, tz: Timezone = tzLocal): number {
  return Math.floor((tz.monthIndex(date) + 3) / 3)
}
