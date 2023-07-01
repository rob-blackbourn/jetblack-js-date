import { daysInMonth } from './daysInMonth'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Check if the date is the last day of the month.
 *
 * The time component is ignored.
 *
 * @category Calendars
 *
 * @param date The date to check.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns True if the date is the last day of the month.
 */
export function isLastDayOfMonth(date: Date, tz: Timezone = tzLocal): boolean {
  return tz.day(date) === daysInMonth(tz.year(date), tz.monthIndex(date))
}
