import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { startOfDay } from './startOfDay'
import { Timezone } from './Timezone'

/**
 * Find the last day of the week for a given date.
 *
 * @remarks
 *
 * Note: weeks start on Sunday and end on Saturday.
 *
 * @example
 *
 * ```js
 * const days2 = lastDayOfWeek(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days2.toISOString())
 * // 2022-03-26T00:00:00.000Z
 *
 * // Compare to endOfWeek
 * const days1 = endOfWeek(new Date('2022-03-25T00:00:00Z'), tzUtc)
 * console.log(days1.toISOString())
 * // 2022-03-26T23:59:59.999Z
 * ```
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
