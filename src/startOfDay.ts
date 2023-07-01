import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the start of the day.
 *
 * @category Anchors
 *
 * ```js
 * import { startOfDay, tzLocal } from '@jetblack/date'
 * 
 * const date = tzLocal.makeDate(2000, 0, 1, 10, 30)
 * console.log(tzLocal.toISOString(startOfDay(date, tzLocal)))
 * // returns "2000-01-01T00:00:00+??:??"
 * ```

 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the day.
 */
export function startOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day } = tz.dateParts(date)

  return tz.makeDate(year, monthIndex, day)
}
