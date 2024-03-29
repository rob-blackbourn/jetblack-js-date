import { addSeconds } from './addSeconds'
import { startOfSecond } from './startOfSecond'

/**
 * Creates a range of dates by seconds.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The second step count.
 * @returns The range of dates separated by step hours from the start to the end second.
 */
export function dateRangeBySecond(
  startDate: Date,
  endDate: Date,
  step: number = 1
): Date[] {
  const endTime = startOfSecond(endDate).getTime()
  let date = startOfSecond(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addSeconds(date, step)
  }
  return dates
}
