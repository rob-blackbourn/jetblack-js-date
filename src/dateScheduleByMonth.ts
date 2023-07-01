import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { addDays } from './addDays'
import { range } from './utils'
import { addMonths } from './addMonths'

/**
 * Creates a schedule of dates by month.
 *
 * @category Ranges
 *
 * @param date The start date.
 * @param start Start offset months.
 * @param stop The number of months.
 * @param step The months step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step months.
 */
export function dateScheduleByMonth(
  date: Date,
  start: number,
  stop: number,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  return range(start, stop, step).map(n => addMonths(date, n, tz))
}
