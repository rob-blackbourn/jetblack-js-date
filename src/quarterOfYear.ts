import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the quarter for a given date.
 *
 * @category Calendars
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The quarter of the year.
 */
export function quarterOfYear(date: Date, tz: Timezone = tzLocal): number {
  return Math.floor((date.getMonth() + 3) / 3)
}
