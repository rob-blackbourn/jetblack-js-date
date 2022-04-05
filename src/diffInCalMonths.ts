import { Timezone } from './timezone'
import { tzLocal } from './localTimezone'

/**
 * Find the number of months between two dates.
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
  const [leftYear, leftMonthIndex] = tz.dateParts(leftDate)
  const [rightYear, rightMonthIndex] = tz.dateParts(rightDate)

  const yearDiff = leftYear - rightYear
  const monthDiff = leftMonthIndex - rightMonthIndex

  return yearDiff * 12 + monthDiff
}
