import { startOfDay } from './startOfDay'
import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { addQuarters } from './addQuarters'

/**
 * Creates a range of dates by quarters.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The quarter step count. Defaults to 1.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step months from the start to the end date.
 */
export function dateRangeByQuarter(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfDay(endDate, tz).getTime()
  let date = startOfDay(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addQuarters(date, step, tz)
  }
  return dates
}
