import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Add months to a date (or subtract if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfMonths The number of months to add (or subtract if negative)
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of months.
 */
export function addMonths(
  date: Date,
  numberOfMonths: number,
  tz: Timezone = tzLocal
): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex + numberOfMonths,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
