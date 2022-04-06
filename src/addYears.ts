import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Add years to a date (or subtract if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfYears The number of years to add (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of years.
 */
export function addYears(
  date: Date,
  numberOfYears: number,
  tz: Timezone = tzLocal
): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tz.dateParts(date)

  return tz.makeDate(
    year + numberOfYears,
    monthIndex,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
