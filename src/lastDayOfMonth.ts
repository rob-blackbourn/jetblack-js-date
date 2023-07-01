import { daysInMonth } from './daysInMonth'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the last day of the month.
 *
 * ```js
 * const days2 = lastDayOfMonth(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days2.toISOString())
 * // 2022-03-31T00:00:00.000Z
 *
 * // Compare with endOfMonth.
 * const days1 = endOfMonth(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days1.toISOString())
 * // 2022-03-31T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the month.
 */
export function lastDayOfMonth(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex } = tz.dateParts(date)

  return tz.makeDate(year, monthIndex, daysInMonth(year, monthIndex))
}
