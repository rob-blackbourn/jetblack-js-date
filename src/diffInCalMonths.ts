import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'

/**
 * Find the number of whole months between two dates.
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The number of months between two dates.
 */
export function diffInCalMonths(
  leftDate: Date,
  rightDate: Date,
  tz: Timezone = tzLocal
): number {
  const yearDiff = tz.year(leftDate) - tz.year(rightDate)
  const monthDiff = tz.monthIndex(leftDate) - tz.monthIndex(rightDate)

  return yearDiff * 12 + monthDiff
}
