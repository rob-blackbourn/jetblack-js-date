import { addDays } from './arithmetic'
import { startOfDay } from './startOfDay'
import { Timezone, tzLocal } from './timezone'

/**
 * Find the start of the week for a given date.
 *
 * @param date A date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the week.
 */
export function startOfWeek(date: Date, tz: Timezone = tzLocal): Date {
  const weekDay = tz.weekDay(date)
  return addDays(startOfDay(date, tz), -weekDay, tz)
}
