import { MILLISECONDS_IN_MINUTE } from './constants'

/**
 * Adds minutes to a date (or subtracts if negative).
 *
 * @example
 *
 * ```js
 * const d1 = addMinutes(new Date('2000-01-01T00:00:00.000'), 5)
 * console.log(d1.toISOString())
 * // 2000-01-01T00:05:00.000Z
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfMinutes The number of minutes to ad (or subtract if negative).
 * @returns A new date adjusted by the number of minutes.
 */
export function addMinutes(date: Date, numberOfMinutes: number): Date {
  return new Date(date.getTime() + numberOfMinutes * MILLISECONDS_IN_MINUTE)
}
