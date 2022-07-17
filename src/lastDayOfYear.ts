import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the last day of the year.
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the year.
 */
export function lastDayOfYear(date: Date, tz: Timezone = tzLocal): Date {
  return tz.makeDate(tz.year(date), 11, 31)
}
