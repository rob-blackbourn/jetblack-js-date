import { tzLocal } from './LocalTimezone'
import { startOfWeekday } from './startOfWeekday'
import { Timezone } from './Timezone'

/**
 * Find the start of an ISO week for a given date.
 *
 * ISO weeks start on a Monday.
 *
 * @category Anchors
 *
 * @param date A date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the week.
 */
export function startOfISOWeek(date: Date, tz: Timezone = tzLocal): Date {
  return startOfWeekday(date, 1, tz)
}
