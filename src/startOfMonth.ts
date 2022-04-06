import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Find the start of the months for a given date.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the month.
 */
export function startOfMonth(date: Date, tz: Timezone = tzLocal): Date {
  return tz.makeDate(tz.year(date), tz.monthIndex(date), 1)
}
