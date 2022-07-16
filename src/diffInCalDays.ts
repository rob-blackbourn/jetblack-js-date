import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { diffInDays } from './diffInDays'
import { tzUtc } from './UTCTimezone'

/**
 * Find the number of days between two dates.
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
  const lhs = tz.as(leftDate, tzUtc)
  const rhs = tz.as(rightDate, tzUtc)

  return Math.round(diffInDays(lhs, rhs))
}
