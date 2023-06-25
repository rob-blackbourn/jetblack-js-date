import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Find the start of the day.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the day.
 */
export function startOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const { year, monthIndex, day } = tz.dateParts(date)

  return tz.makeDate(year, monthIndex, day)
}
