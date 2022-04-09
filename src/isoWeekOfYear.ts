import { addDays } from './addDays'
import { diffInCalDays } from './diffInCalDays'
import { tzLocal } from './LocalTimezone'
import { startOfYear } from './startOfYear'
import { Timezone } from './Timezone'

/**
 * Find the ISO week of the year.
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The ISO week.
 */
export function isoWeekOfYear(date: Date, tz: Timezone = tzLocal): number {
  const nearestThursday = addDays(date, 4 - (tz.weekday(date) || 7))
  const yearStart = startOfYear(nearestThursday, tz)
  const daysBetween = diffInCalDays(nearestThursday, yearStart, tz)
  const week = Math.ceil((daysBetween + 1) / 7)
  return week
}
