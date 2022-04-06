import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Add hours to a date (or subtract if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfHours The number of hours to add (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of hours.
 */
export function addHours(
  date: Date,
  numberOfHours: number,
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
    day,
    hours + numberOfHours,
    minutes,
    seconds,
    milliseconds
  )
}
