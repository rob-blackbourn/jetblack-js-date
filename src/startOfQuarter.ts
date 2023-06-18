import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { quarterOfYear } from './quarterOfYear'

/**
 * Find the start of the quarter for a given date.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the quarter.
 */
export function startOfQuarter(date: Date, tz: Timezone = tzLocal): Date {
  const quarter = quarterOfYear(date, tz)
  const monthIndex = 3 * (quarter - 1)
  return tz.makeDate(tz.year(date), monthIndex, 1)
}
