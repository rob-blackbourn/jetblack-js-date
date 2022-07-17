import { daysInMonth } from './daysInMonth'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the last day of the month.
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the month.
 */
export function lastDayOfMonth(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex } = tz.dateParts(date, {
    year: true,
    monthIndex: true
  })

  return tz.makeDate(year, monthIndex, daysInMonth(year, monthIndex))
}
