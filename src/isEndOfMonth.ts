import { daysInMonth } from './daysInMonth'
import { Timezone, tzLocal } from './timezone'

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
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    _hours,
    _minutes,
    _seconds,
    _milliseconds
  ] = tz.dateParts(date)
  return day === daysInMonth(year, monthIndex)
}
