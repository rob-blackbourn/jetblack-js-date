import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { diffInDays } from './diffInDays'
import { tzUtc } from './UTCTimezone'
import { startOfDay } from './startOfDay'

/**
 * Find the number of whole days between two dates, discarding any time component.
 *
 * @example
 *
 * ```js
 * const days1 = diffInCalDays(
 *   new Date('2022-03-25T00:00:00Z'),
 *   new Date('2022-01-25T00:00:00Z'),
 *   tzUtc
 * )
 * console.log(days1)
 * // 59
 *
 * // The time part is discarded.
 * const days2 = diffInCalDays(
 *   new Date('2022-03-25T12:00:00Z'),
 *   new Date('2022-01-25T00:00:00Z'),
 *   tzUtc
 * )
 * console.log(days2)
 * // 59
 * ```
 *
 * @category Differences
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInCalDays(
  leftDate: Date,
  rightDate: Date,
  tz: Timezone = tzLocal
) {
  const lhs = tz.as(startOfDay(leftDate, tz), tzUtc)
  const rhs = tz.as(startOfDay(rightDate, tz), tzUtc)

  return Math.floor(diffInDays(lhs, rhs))
}
