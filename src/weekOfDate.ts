import { startOfWeek } from './startOfWeek'
import { startOfWeekYear } from './startOfWeekYear'
import { Timezone, tzLocal } from './timezone'

const MILLISECONDS_IN_WEEK = 7 * 24 * 60 * 60 * 1000

export function weekOfDate(date: Date, tz: Timezone = tzLocal): number {
  const end = startOfWeek(date, tz)
  const start = startOfWeekYear(date, tz)
  const diff = end.getTime() - start.getTime()

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}
