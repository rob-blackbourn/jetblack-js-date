import { Duration } from './Duration'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Add a duration to a date.
 *
 * @example
 *
 * ```js
 * const duration = new Duration('P1DT3H')
 * const date = addDuration(tzLocal.makeDate(2000, 0, 1), duration, tzLocal)
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param duration The duration to add.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by adding the duration.
 */
export function addDuration(
  date: Date,
  duration: Duration,
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
    year + duration.years,
    monthIndex + duration.months,
    day + (duration.days + duration.weeks * 7),
    hours + duration.hours,
    minutes + duration.minutes,
    seconds + duration.seconds,
    milliseconds
  )
}
