import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the start of the second.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the second.
 */
export function startOfSecond(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day, hours, minutes, seconds } = tz.dateParts(
    date,
    {
      year: true,
      monthIndex: true,
      day: true,
      hours: true,
      minutes: true,
      seconds: true
    }
  )
  return tz.makeDate(year, monthIndex, day, hours, minutes, seconds)
}
