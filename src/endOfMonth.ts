import { daysInMonth } from './daysInMonth'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Calculate the last day of the month.
 *
 * @category Anchors
 *
 * @param year The year.
 * @param monthIndex The month index (where January is 0).
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns A date which is the last day of the month for the given year and month.
 */
export function endOfMonth(
  year: number,
  monthIndex: number,
  tz: Timezone = tzLocal
): Date {
  return tz.makeDate(year, monthIndex, daysInMonth(year, monthIndex))
}
