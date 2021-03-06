import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Adds seconds to a date (or subtracts if negative).
 *
 * ```js
 * const d1 = addSeconds(new Date('2000-01-01T00:00:00.000'), 61, tzUtc)
 * console.log(d1.toISOString())
 * // 2000-01-01T00:01:01.000Z
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfSeconds The number of seconds to add.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of seconds.
 */

export function addSeconds(
  date: Date,
  numberOfSeconds: number,
  tz: Timezone = tzLocal
): Date {
  const { year, monthIndex, day, hours, minutes, seconds, milliseconds } =
    tz.dateParts(date, {
      year: true,
      monthIndex: true,
      day: true,
      hours: true,
      minutes: true,
      seconds: true,
      milliseconds: true
    })

  return tz.makeDate(
    year,
    monthIndex,
    day,
    hours,
    minutes,
    seconds + numberOfSeconds,
    milliseconds
  )
}
