import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Find the start of the minute.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the minute.
 */
export function startOfMinute(date: Date, tz: Timezone = tzLocal): Date {
  const [year, monthIndex, day, hours, minutes] = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, day, hours, minutes)
}
