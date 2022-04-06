import { Duration } from './duration'
import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Subtract a duration from a date.
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param duration The duration to subtract.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns A new date adjusted by subtracting the duration.
 */
export function subDuration(
  date: Date,
  duration: Duration,
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
    year - duration.years,
    monthIndex - duration.months,
    day - (duration.days + duration.weeks * 7),
    hours - duration.hours,
    minutes - duration.minutes,
    seconds - duration.seconds,
    milliseconds
  )
}
