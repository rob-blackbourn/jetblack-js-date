import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the start of the hour.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the hour.
 */
export function startOfHour(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day, hours } = tz.dateParts(date, {
    year: true,
    monthIndex: true,
    day: true,
    hours: true
  })
  return tz.makeDate(year, monthIndex, day, hours)
}
