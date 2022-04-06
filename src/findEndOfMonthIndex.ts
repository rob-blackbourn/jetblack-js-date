import { isEndOfMonth } from './isEndOfMonth'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the index of the first date that is the end of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findEndOfMonthIndex(
  dates: Date[],
  tz: Timezone = tzLocal
): number {
  return dates.findIndex(date => isEndOfMonth(date, tz))
}
