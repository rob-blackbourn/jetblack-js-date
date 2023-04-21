import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { startOfDay } from './startOfDay'
import { Timezone } from './Timezone'

/**
 * Find the start of the week for a given date and first day of week.
 *
 * @category Anchors
 *
 * @param date A date.
 * @param weekStartsOn The first day of the week where 0 is Sunday.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the week.
 */
export function startOfWeekday(
  date: Date,
  weekStartsOn: number,
  tz: Timezone = tzLocal
): Date {
  const weekday = tz.weekday(date)
  const dayStart = startOfDay(date, tz)
  const daysAway = (weekday < weekStartsOn ? 7 : 0) + weekday - weekStartsOn
  return daysAway === 0 ? dayStart : addDays(dayStart, -daysAway, tz)
}
