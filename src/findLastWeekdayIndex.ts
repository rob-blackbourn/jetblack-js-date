import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'
import { findLastIndex } from './utils'

/**
 * Find the index of the last date with the given weekday.
 *
 * @param dates The dates
 * @param day The weekday to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function findLastWeekdayIndex(
  dates: Date[],
  weekDay: number,
  tz: Timezone = tzLocal
): number {
  return findLastIndex(dates, date => tz.weekDay(date) === weekDay)
}
