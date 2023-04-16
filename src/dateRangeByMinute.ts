import { addMinutes } from './addMinutes'
import { startOfMinute } from './startOfMinute'
import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'

/**
 * Creates a range of dates by minutes.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The minute step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step hours from the start to the end minute.
 */
export function dateRangeByMinute(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfMinute(endDate, tz).getTime()
  let date = startOfMinute(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addMinutes(date, step)
  }
  return dates
}
