import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Return the end of the hour for the given date.
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date which is the end of the hour.
 */
export function endOfHour(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day, hours } = tz.dateParts(date, {
    year: true,
    monthIndex: true,
    day: true,
    hours: true
  })
  return tz.makeDate(year, monthIndex, day, hours, 59, 59, 999)
}
