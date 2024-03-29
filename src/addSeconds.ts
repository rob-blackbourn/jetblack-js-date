import { MILLISECONDS_IN_SECOND } from './constants'

/**
 * Adds seconds to a date (or subtracts if negative).
 *
 * ```js
 * import { addSeconds } from '@jetblack/date'
 *
 * const d1 = addSeconds(new Date('2000-01-01T00:00:00.000'), 61)
 * console.log(d1.toISOString())
 * // 2000-01-01T00:01:01.000Z
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfSeconds The number of seconds to add.
 * @returns A new date adjusted by the number of seconds.
 */
export function addSeconds(date: Date, numberOfSeconds: number): Date {
  return new Date(date.getTime() + numberOfSeconds * MILLISECONDS_IN_SECOND)
}
