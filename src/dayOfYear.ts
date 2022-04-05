import { startOfYear } from './anchors'
import { diffInCalDays } from './differences'
import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Find the day of the year.
 *
 * @param date The date
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The day of the year
 */
export function dayOfYear(date: Date, tz: Timezone = tzLocal): number {
  const diff = diffInCalDays(date, startOfYear(date, tz), tz)
  const dayOfYear = diff + 1
  return dayOfYear
}
