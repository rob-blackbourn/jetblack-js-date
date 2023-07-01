import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { addDays } from './addDays'
import { range } from './utils'

/**
 * Creates a schedule of dates by week.
 *
 * @category Ranges
 *
 * @param date The start date.
 * @param start Start offset weeks.
 * @param stop The number of weeks.
 * @param step The weeks step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step weeks.
 */
export function dateScheduleByWeek(
  date: Date,
  start: number,
  stop: number,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  return range(start, stop, step).map(n => addDays(date, n * 7, tz))
}
