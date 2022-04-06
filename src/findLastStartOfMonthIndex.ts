import { findLastDayIndex } from './findLastDayIndex'
import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Find the index of the last date that is the start of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function findLastStartOfMonthIndex(
  dates: Date[],
  tz: Timezone = tzLocal
): number {
  return findLastDayIndex(dates, 1, tz)
}
