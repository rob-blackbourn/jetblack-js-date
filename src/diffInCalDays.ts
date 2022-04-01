import { startOfDay } from './startOfDay'
import { Timezone, tzLocal } from './timezone'

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000

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
