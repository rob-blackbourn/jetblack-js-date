import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { startOfDay } from './startOfDay'
import { Timezone } from './Timezone'

/**
 * Find the start of the week for a given date.
 *
 * @category Anchors
 *
 * @param date A date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the week.
 */
export function startOfWeek(date: Date, tz: Timezone = tzLocal): Date {
  const weekday = tz.weekday(date)
  return addDays(startOfDay(date, tz), -weekday, tz)
}
