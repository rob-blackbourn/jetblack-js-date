import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the start of the year for a given date.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the year.
 */
export function startOfYear(date: Date, tz: Timezone = tzLocal): Date {
  return tz.makeDate(tz.year(date), 0, 1)
}
