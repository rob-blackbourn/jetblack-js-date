import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Return the end of the day for the given date.
 *
 * ```js
 * import { endOfDay, tzUtc } from '@jetblack/date'
 *
 * const d1 = tzUtc.makeDate(2000, 1, 1)
 * const d2 = endOfDay(d1, tzUtc)
 * console.log(d2.toISOString())
 * // 2000-02-01T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date which is the end of the day.
 */
export function endOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day } = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, day, 23, 59, 59, 999)
}
