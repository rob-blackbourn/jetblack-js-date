import { isDateEqual } from './isDateEqual'
import { lastDayOfQuarter } from './lastDayOfQuarter'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Check if the date is the last day of the quarter.
 *
 * @category Calendars
 *
 * @param date The date to check.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns True if the date is the last day of the quarter.
 */
export function isLastDayOfQuarter(
  date: Date,
  tz: Timezone = tzLocal
): boolean {
  const end = lastDayOfQuarter(date, tz)
  return isDateEqual(date, end)
}
