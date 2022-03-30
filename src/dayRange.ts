import { Timezone, tzLocal } from './timezone'
import { startOfDay } from './startOfDay'
import { addDays } from './addDays'

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
    date = addDays(date, step)
  }
  return dates
}
