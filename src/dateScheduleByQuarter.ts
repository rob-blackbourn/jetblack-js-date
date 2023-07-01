import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { range } from './utils'
import { addQuarters } from './addQuarters'

/**
 * Creates a schedule of dates by quarter.
 *
 * @category Ranges
 *
 * @param date The start date.
 * @param start Start offset quarters.
 * @param stop The number of quarters.
 * @param step The quarters step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step quarter.
 */
export function dateScheduleByQuarter(
  date: Date,
  start: number,
  stop: number,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  return range(start, stop, step).map(n => addQuarters(date, n, tz))
}
