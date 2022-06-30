import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

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
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date which is the end of the minute.
 */
export function endOfMinute(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day, hours, minutes } = tz.dateParts(date, {
    year: true,
    monthIndex: true,
    day: true,
    hours: true,
    minutes: true
  })
  return tz.makeDate(year, monthIndex, day, hours, minutes, 59, 999)
}
