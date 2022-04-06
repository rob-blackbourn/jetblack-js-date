import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Find the index of the first date with the given weekday.
 *
 * @param dates The dates
 * @param day The weekday to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findWeekdayIndex(
  dates: Date[],
  weekDay: number,
  tz: Timezone = tzLocal
): number {
  return dates.findIndex(date => tz.weekDay(date) === weekDay)
}
