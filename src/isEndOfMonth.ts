import { daysInMonth } from './daysInMonth'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Check if the date is the last day of the month.
 *
 * @category Calendars
 *
 * @param date The date to check.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns True if the date is the last day of the month.
 */
export function isEndOfMonth(date: Date, tz: Timezone = tzLocal): boolean {
  const { year, monthIndex, day } = tz.dateParts(date, {
    year: true,
    monthIndex: true,
    day: true
  })
  return day === daysInMonth(year, monthIndex)
}
