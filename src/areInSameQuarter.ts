import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { quarterOfYear } from './quarterOfYear'

/**
 * Compare two dates to see if they are in the same quarter of the year.
 *
 * @category Comparisons
 *
 * @param first The first date.
 * @param second The second date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns True if the dates are in the same quarter, otherwise false.
 */
export function areInSameQuarter(
  first: Date,
  second: Date,
  tz: Timezone = tzLocal
): boolean {
  return quarterOfYear(first) === quarterOfYear(second)
}
