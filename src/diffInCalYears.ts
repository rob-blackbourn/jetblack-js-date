import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { diffInCalMonths } from './diffInCalMonths'

/**
 * Find the number of whole years between two dates.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The number of years between two dates.
 */
export function diffInCalYears(
  leftDate: Date,
  rightDate: Date,
  tz: Timezone = tzLocal
): number {
  return Math.trunc(diffInCalMonths(leftDate, rightDate, tz) / 12)
}
