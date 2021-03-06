import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the start of the minute.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the minute.
 */
export function startOfMinute(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day, hours, minutes } = tz.dateParts(date, {
    year: true,
    monthIndex: true,
    day: true,
    hours: true,
    minutes: true
  })
  return tz.makeDate(year, monthIndex, day, hours, minutes)
}
