import { startOfHour } from './startOfHour'
import { Timezone } from './timezone'
import { tzLocal } from './localTimezone'
import { addHours } from './addHours'

/**
 * Creates a range of dates by hours.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The hour step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step hours from the start to the end hour.
 */

export function hourRange(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfHour(endDate, tz).getTime()
  let date = startOfHour(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addHours(date, step, tz)
  }
  return dates
}
