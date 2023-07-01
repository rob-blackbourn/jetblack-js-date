import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Add quarters to a date (or subtract if negative).
 *
 * The day of the quarter is kept constant if possible. Where the destination
 * has less days at the end of the month, the surplus days are added.
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfQuarters The number of quarters to add (or subtract if negative)
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of quarters.
 */
export function addQuarters(
  date: Date,
  numberOfQuarters: number,
  tz: Timezone = tzLocal
): Date {
  const { year, monthIndex, day, hours, minutes, seconds, milliseconds } =
    tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex + numberOfQuarters * 3,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
