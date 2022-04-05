import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Find the start of the hour.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the hour.
 */
export function startOfHour(date: Date, tz: Timezone = tzLocal): Date {
  const [year, monthIndex, _weekDay, day, hours] = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, day, hours)
}
