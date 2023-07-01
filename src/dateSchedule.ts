import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { range } from './utils'
import { addYears } from './addYears'
import { dateScheduleByDay } from './dateScheduleByDay'
import { dateScheduleByWeek } from './dateScheduleByWeek'
import { dateScheduleByMonth } from './dateScheduleByMonth'
import { dateScheduleByQuarter } from './dateScheduleByQuarter'
import { dateScheduleByYear } from './dateScheduleByYear'

export type Periodicity =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'yearly'

/**
 * Creates a schedule of dates for a periodicity.
 *
 * @category Ranges
 *
 * @param periodicity The periodicity.
 * @param date The start date.
 * @param start Start offset periods.
 * @param stop The number of periods.
 * @param step The period step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The schedule of dates.
 */
export function dateSchedule(
  periodicity: Periodicity,
  date: Date,
  start: number,
  stop: number,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  if (periodicity === 'daily') {
    return dateScheduleByDay(date, start, stop, step, tz)
  } else if (periodicity == 'weekly') {
    return dateScheduleByWeek(date, start, stop, step, tz)
  } else if (periodicity === 'monthly') {
    return dateScheduleByMonth(date, start, stop, step, tz)
  } else if (periodicity === 'quarterly') {
    return dateScheduleByQuarter(date, start, stop, step, tz)
  } else if (periodicity === 'yearly') {
    return dateScheduleByYear(date, start, stop, step, tz)
  } else {
    throw new RangeError('invalid periodicity')
  }
}
