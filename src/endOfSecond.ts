import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Return the end of the second for the given date.
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date which is the end of the second.
 */
export function endOfSecond(date: Date, tz: Timezone = tzLocal): Date {
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
  return tz.makeDate(year, monthIndex, day, hours, minutes, seconds, 999)
}
