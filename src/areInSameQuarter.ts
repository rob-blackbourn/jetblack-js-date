import { Timezone, tzLocal } from './timezone'

/**
 * Compare two dates to see if they are in the same quarter of the year.
 *
 * @param first The first date.
 * @param second The second date.
 * @param tz The optional timezone. Defaults to tzLocal.
 * @returns True if the dates are in the same quarter, otherwise false.
 */
export function areInSameQuarter(
  first: Date,
  second: Date,
  tz: Timezone = tzLocal
): boolean {
  return tz.monthIndex(first) % 4 == tz.monthIndex(second)
}
