import { startOfWeek } from './startOfWeek'
import { Timezone, tzLocal } from './timezone'
import { weekYear } from './weekYear'

export function startOfWeekYear(date: Date, tz: Timezone = tzLocal): Date {
  const year = weekYear(date, tz)
  const firstWeek = tz.makeDate(year, 0, 1)
  return startOfWeek(firstWeek, tz)
}
