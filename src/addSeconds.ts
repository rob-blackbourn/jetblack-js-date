import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Adds seconds to a date (or subtracts if negative).
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
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tz.dateParts(date)

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
