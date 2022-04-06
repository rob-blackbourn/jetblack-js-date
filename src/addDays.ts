import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Add days to a date (or subtract if negative)
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfDays The number of days to add (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of days.
 */
export function addDays(
  date: Date,
  numberOfDays: number,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex,
    day + numberOfDays,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
