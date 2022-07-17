import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { startOfDay } from './startOfDay'
import { Timezone } from './Timezone'

/**
 * Find the last day of the week for a given date.
 *
 * Note: weeks start on Sunday and end on Saturday.
 *
 * @category Anchors
 *
 * @param date A date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A date which is the last day of the week.
 */
export function lastDayOfWeek(date: Date, tz: Timezone = tzLocal): Date {
  const weekday = tz.weekday(date)
  const dayEnd = startOfDay(date, tz)
  return weekday === 6 ? dayEnd : addDays(dayEnd, 6 - weekday, tz)
}
