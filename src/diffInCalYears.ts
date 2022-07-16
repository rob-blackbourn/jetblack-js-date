import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'

/**
 * Find the number of years between two dates.
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
  return tz.year(leftDate) - tz.year(rightDate)
}
