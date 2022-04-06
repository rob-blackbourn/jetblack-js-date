import { startOfDay } from './startOfDay'
import { Timezone } from './timezone'
import { tzLocal } from './localTimezone'
import { addMonths } from './addMonths'

/**
 * Creates a range of dates by month.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The month step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step months from the start to the end date.
 */

export function monthRange(
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
    date = addMonths(date, step, tz)
  }
  return dates
}
