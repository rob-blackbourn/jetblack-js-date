import { addSeconds } from './addSeconds'
import { startOfSecond } from './startOfSecond'
import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'

/**
 * Creates a range of dates by seconds.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The second step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step hours from the start to the end second.
 */
export function dateRangeBySecond(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfSecond(endDate, tz).getTime()
  let date = startOfSecond(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addSeconds(date, step, tz)
  }
  return dates
}
