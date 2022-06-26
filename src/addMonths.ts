import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Add months to a date (or subtract if negative).
 *
 * The day of the month is kept constant if possible. Where the destination
 * has less days at the end of the month, the surplus days are added.
 *
 * ```js
 * import { addMonths } from '@jetblack/date'
 *
 * // The day of the month is kept constant if possible.
 * const d1 = new Date('2000-01-12')
 * console.log(d1.toString())
 * // Wed Jan 12 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * const d2 = addMonths(d1, 1)
 * console.log(d2.toString())
 * // Sat Feb 12 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 *
 * // If there are less days in the following month the surplus days are added.
 * const d3 = new Date('2000-01-31')
 * console.log(d3.toString())
 * // Mon Jan 31 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * const d4 = addMonths(d3, 1)
 * console.log(d4.toString())
 * // Thu Mar 02 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 * ```
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
    monthIndex + numberOfMonths,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
