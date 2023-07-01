import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { range } from './utils'
import { addQuarters } from './addQuarters'

/**
 * Creates a schedule of dates by quarter.
 *
 * ```js
 * import { dateScheduleByQuarter, tzLocal } from '@jetblack/date'
 *
 * console.log(
 *   dateScheduleByQuarter(tzLocal.makeDate(2000, 0, 1), 0, 4).map(x =>
 *     tzLocal.toISOString(x)
 *   )
 * )
 * // returns (4) ['2000-01-01T00:00:00+00:00', '2000-04-01T00:00:00-01:00', '2000-07-01T00:00:00-01:00', '2000-10-01T00:00:00-01:00']
 * ```
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
