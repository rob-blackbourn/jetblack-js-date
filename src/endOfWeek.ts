import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { endOfDay } from './endOfDay'
import { Timezone } from './Timezone'

/**
 * Find the end of the week for a given date.
 *
 * @category Anchors
 *
 * @param date A date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The end of the week.
 */
export function endOfWeek(date: Date, tz: Timezone = tzLocal): Date {
  const weekday = tz.weekday(date)
  const dayEnd = endOfDay(date, tz)
  return weekday === 6 ? dayEnd : addDays(dayEnd, 6 - weekday, tz)
}
