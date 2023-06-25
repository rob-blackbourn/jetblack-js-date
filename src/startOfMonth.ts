import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the start of the month for a given date.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the month.
 */
export function startOfMonth(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex } = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, 1)
}
