import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { startOfDay } from './startOfDay'
import { Timezone } from './Timezone'

/**
 * Round a date to the start of the current day if before noon;
 * otherwise the start of the next day.
 *
 * ```js
 * import { roundDate, tzLocal } from '@jetblack/date'
 * 
 * const morning = tzLocal.makeDate(2000, 0, 1, 10, 30)
 * console.log(tzLocal.toISOString(roundDate(morning, tzLocal)))
 * // returns "2000-01-01T00:00:00+??:??"
 * 
 * const afternoon = tzLocal.makeDate(2000, 0, 1, 18, 30)
 * console.log(tzLocal.toISOString(roundDate(afternoon, tzLocal)))
 * // returns "2000-01-02T00:00:00+??:??"
 * 
 * const noon = tzLocal.makeDate(2000, 0, 1, 12, 0)
 * console.log(tzLocal.toISOString(roundDate(noon, tzLocal)))
 * // returns "2000-01-02T00:00:00+??:??"
 * ```

 * @param date The date to round
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the day of the rounded date.
 */
export function roundDate(date: Date, tz: Timezone = tzLocal): Date {
  return tz.hours(date) < 12
    ? startOfDay(date, tz)
    : startOfDay(addDays(date, 1, tz), tz)
}
