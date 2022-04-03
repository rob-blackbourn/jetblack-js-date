import { startOfDay } from './startOfDay'
import { Timezone, tzLocal } from './timezone'
import { MILLISECONDS_IN_DAY } from './constants'

/**
 * Find the number of days between two dates.
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInCalDays(
  startDate: Date,
  endDate: Date,
  tz: Timezone = tzLocal
) {
  const start = startOfDay(startDate, tz)
  const end = startOfDay(endDate, tz)

  const startTime = start.getTime() - tz.offset(start)
  const endTime = end.getTime() - tz.offset(end)

  return Math.round((startTime - endTime) / MILLISECONDS_IN_DAY)
}
