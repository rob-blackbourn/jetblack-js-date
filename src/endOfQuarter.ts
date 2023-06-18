import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { daysInMonth } from './daysInMonth'
import { quarterOfYear } from './quarterOfYear'

/**
 * Find the last moment of the quarter.
 *
 * @category Anchors
 *
 * @param date A date
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The last moment of the quarter.
 */
export function endOfQuarter(date: Date, tz: Timezone = tzLocal): Date {
  const quarter = quarterOfYear(date, tz)
  const monthIndex = 3 * (quarter - 1) + 2
  const year = tz.year(date)
  const day = daysInMonth(year, monthIndex)
  return tz.makeDate(year, monthIndex, day, 23, 59, 59, 999)
}
