import { addDays } from './addDays'
import { diffInCalDays } from './diffInCalDays'
import { tzLocal } from './LocalTimezone'
import { startOfYear } from './startOfYear'
import { Timezone } from './Timezone'

/**
 * Find the ISO week date.
 *
 * ```js
 * console.log(isoWeekDate(new Date("2000-01-01T00:00:00Z")))
 * // [1999, 52, 6]
 * ```
 *
 * @param date The date
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The ISO date as a year, week, and day.
 */
export function isoWeekDate(date: Date, tz: Timezone = tzLocal) {
  const dayAdjust = 4 - (tz.weekday(date) || 7)
  const nearestThursday = addDays(date, dayAdjust)
  const isoYear = tz.year(nearestThursday)
  const yearStart = startOfYear(nearestThursday)
  const daysToThursday = diffInCalDays(nearestThursday, yearStart, tz)
  const isoWeek = Math.ceil((daysToThursday + 1) / 7)
  const isoDay = 1 + ((10 - dayAdjust) % 7)
  return [isoYear, isoWeek, isoDay]
}
