import { startOfWeek } from './startOfWeek'
import { Timezone, tzLocal } from './timezone'
import { weekYear } from './weekYear'

/**
 * Find the first week of the year for a given date.
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The date of the first week of the year.
 */
export function startOfWeekYear(date: Date, tz: Timezone = tzLocal): Date {
  const year = weekYear(date, tz)
  const firstWeek = tz.makeDate(year, 0, 1)
  return startOfWeek(firstWeek, tz)
}
