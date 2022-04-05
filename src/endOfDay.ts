import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Return the end of the day for the given date.
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to otzLocal.
 * @returns A new date which is the end of the day.
 */
export function endOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const [year, monthIndex, _weekDay, day] = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, day, 23, 59, 59, 999)
}
