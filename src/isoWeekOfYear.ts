import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { startOfYear } from './startOfYear'
import { Timezone } from './Timezone'

export function isoWeekOfYear(date: Date, tz: Timezone = tzLocal): number {
  const nearestThursday = addDays(date, 4 - (tz.weekday(date) || 7))
  const yearStart = startOfYear(nearestThursday, tz)
  const daysBetween =
    (nearestThursday.getTime() - yearStart.getTime()) / 86400000
  const weekday = Math.ceil((daysBetween + 1) / 7)
  return weekday
}
