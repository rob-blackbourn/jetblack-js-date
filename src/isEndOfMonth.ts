import { daysInMonth } from './daysInMonth'
import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Check if the date is the last day of the month.
 *
 * @category Calendars
 *
 * @param date The date to check.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns True if the date is the last day of the month.
 */
export function isEndOfMonth(date: Date, tz: Timezone = tzLocal): boolean {
  return tz.day(date) === daysInMonth(tz.year(date), tz.monthIndex(date))
}
