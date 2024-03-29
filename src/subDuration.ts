import { Duration } from './Duration'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Subtract a duration from a date.
 *
 * @deprecated This function was required before duration could be negative and is no longer necessary. It will be removed in the next major release.
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param duration The duration to subtract.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by subtracting the duration.
 */
export function subDuration(
  date: Date,
  duration: Duration,
  tz: Timezone = tzLocal
): Date {
  const { year, monthIndex, day, hours, minutes, seconds, milliseconds } =
    tz.dateParts(date)

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
