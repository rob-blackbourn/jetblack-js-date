import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { addDays } from './addDays'
import { range } from './utils'

/**
 * Creates a schedule of dates by day.
 *
 * @category Ranges
 *
 * @param date The start date.
 * @param start Start offset days.
 * @param stop The number of days.
 * @param step The days step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step days.
 */
export function dateScheduleByDay(
  date: Date,
  start: number,
  stop: number,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  return range(start, stop, step).map(n => addDays(date, n, tz))
}
