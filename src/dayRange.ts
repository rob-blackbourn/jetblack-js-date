import { startOfDay } from './startOfDay'
import { Timezone } from './timezone'
import { tzLocal } from './localTimezone'
import { addDays } from './addDays'

/**
 * Creates a range of dates by day.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The day step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step days from the start to the end date.
 */

export function dayRange(
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
    date = addDays(date, step, tz)
  }
  return dates
}
