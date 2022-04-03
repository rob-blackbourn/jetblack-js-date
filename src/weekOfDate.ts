import { startOfWeek } from './startOfWeek'
import { startOfWeekYear } from './startOfWeekYear'
import { Timezone, tzLocal } from './timezone'

const MILLISECONDS_IN_WEEK = 7 * 24 * 60 * 60 * 1000

/**
 * Find the week of the year for a given date.
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The week of the year.
 */
export function weekOfDate(date: Date, tz: Timezone = tzLocal): number {
  const end = startOfWeek(date, tz)
  const start = startOfWeekYear(date, tz)
  const diff = end.getTime() - start.getTime()
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1
}
