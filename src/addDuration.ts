import { Duration } from './duration'
import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Add a duration to a date.
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param duration The duration to add.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns A new date adjusted by adding the duration.
 */
export function addDuration(
  date: Date,
  duration: Duration,
  tz: Timezone = tzLocal
): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tz.dateParts(date)

  return tz.makeDate(
    year + duration.years,
    monthIndex + duration.months,
    day + (duration.days + duration.weeks * 7),
    hours + duration.hours,
    minutes + duration.minutes,
    seconds + duration.seconds,
    milliseconds
  )
}
