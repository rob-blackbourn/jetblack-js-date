import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Adds milliseconds to a date (or subtracts if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfMilliseconds The number of milliseconds to add (or subtract if negative).
 * @param tz An Optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of milliseconds.
 */

export function addMilliseconds(
  date: Date,
  numberOfMilliseconds: number,
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
    seconds,
    milliseconds + numberOfMilliseconds
  )
}
