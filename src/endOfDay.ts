import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Return the end of the day for the given date.
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date which is the end of the day.
 */
export function endOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day } = tz.dateParts(date, {
    year: true,
    monthIndex: true,
    day: true
  })
  return tz.makeDate(year, monthIndex, day, 23, 59, 59, 999)
}
