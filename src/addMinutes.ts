import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Adds minutes to a date (or subtracts if negative).
 *
 * ```js
 * const d1 = addMinutes(new Date('2000-01-01T00:00:00.000'), 5, tzUtc)
 * console.log(d1.toISOString())
 * // 2000-01-01T00:05:00.000Z
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfMinutes The number of minutes to ad (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of minutes.
 */
export function addMinutes(
  date: Date,
  numberOfMinutes: number,
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
    minutes + numberOfMinutes,
    seconds,
    milliseconds
  )
}
