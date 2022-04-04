import { Timezone, tzLocal } from './timezone'

/**
 * Checks if the dates are equal.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date equals the right date, otherwise false.
 */
export function dateEquals(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() === rhs.getTime()
}

/**
 * Checks if the dates are not equal.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the dates are not equal, otherwise false.
 */
export function dateNotEquals(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() !== rhs.getTime()
}

/**
 * Checks if the left date is before the right date.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is before the right date, otherwise false.
 */
export function dateBefore(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() < rhs.getTime()
}

/**
 * Checks if the left date is on or before the right date.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is on or before the right date, otherwise false.
 */
export function dateOnOrBefore(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() <= rhs.getTime()
}

/**
 * Checks if the left date is on or after the right date.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is on or after the right date, otherwise false.
 */
export function dateOnOrAfter(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() >= rhs.getTime()
}

/**
 * Checks if the left date is after the right date.
 *
 * @category Comparisons
 *
 * @param lhs The left date.
 * @param rhs The right date.
 * @returns True if the left date is after the right date, otherwise false.
 */
export function dateAfter(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() > rhs.getTime()
}

/**
 * Compares two dates ascending.
 *
 * @category Comparisons
 *
 * @param a The first date.
 * @param b The second date.
 * @returns 1 if the first date is greater than the second date, -1 if the first date is less than the last date, otherwise 0.
 */
export function compareDateAsc(a: Date, b: Date): number {
  return Math.sign(b.getTime() - a.getTime())
}

/**
 * Compares two dates descending.
 *
 * @category Comparisons
 *
 * @param a The first date.
 * @param b The second date.
 * @returns 1 if the second date is greater than the first date, -1 if the second date is less than the first date, otherwise 0.
 */
export function compareDateDesc(a: Date, b: Date): number {
  return Math.sign(a.getTime() - b.getTime())
}

/**
 * Compare two dates to see if they are in the same quarter of the year.
 *
 * @category Comparisons
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
