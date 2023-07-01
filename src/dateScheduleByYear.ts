import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { range } from './utils'
import { addYears } from './addYears'

/**
 * Creates a schedule of dates by year.
 *
 * @category Ranges
 *
 * @param date The start date.
 * @param start Start offset years.
 * @param stop The number of years.
 * @param step The years step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates separated by step years.
 */
export function dateScheduleByYear(
  date: Date,
  start: number,
  stop: number,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  return range(start, stop, step).map(n => addYears(date, n, tz))
}
