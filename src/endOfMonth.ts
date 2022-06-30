import { daysInMonth } from './daysInMonth'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Calculate the last moment of the month.
 *
 * ```js
 * const d1 = tzUtc.makeDate(2000, 1, 1)
 * const d2 = endOfMonth(d1, tzUtc)
 * console.log(d2.toISOString())
 * // 2000-02-29T23:59:59.999Z
 * ```
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the month for the given year and month.
 */
export function endOfMonth(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex } = tz.dateParts(date, {
    year: true,
    monthIndex: true
  })

  return tz.makeDate(
    year,
    monthIndex,
    daysInMonth(year, monthIndex),
    23,
    59,
    59,
    999
  )
}
