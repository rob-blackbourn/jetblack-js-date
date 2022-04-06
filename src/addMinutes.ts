import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Adds minutes to a date (or subtracts if negative).
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
    hours,
    minutes + numberOfMinutes,
    seconds,
    milliseconds
  )
}
