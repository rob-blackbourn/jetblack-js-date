import { startOfHour } from './startOfHour'
import { addHours } from './addHours'

/**
 * Creates a range of dates by hours.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The hour step count.
 * @returns The range of dates separated by step hours from the start to the end hour.
 */
export function dateRangeByHour(
  startDate: Date,
  endDate: Date,
  step: number = 1
): Date[] {
  const endTime = startOfHour(endDate).getTime()
  let date = startOfHour(startDate)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addHours(date, step)
  }
  return dates
}
