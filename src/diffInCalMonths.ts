import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { startOfDay } from './startOfDay'
import { tzUtc } from './UTCTimezone'

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
  const lhs = tz.as(startOfDay(leftDate, tz), tzUtc)
  const rhs = tz.as(startOfDay(rightDate, tz), tzUtc)
  const yearDiff = tz.year(lhs) - tz.year(rhs)
  const monthDiff = tz.monthIndex(lhs) - tz.monthIndex(rhs)
  const dayDiff = tz.day(lhs) - tz.day(rhs)

  return yearDiff * 12 + monthDiff - (dayDiff < 0 ? 1 : 0)
}
