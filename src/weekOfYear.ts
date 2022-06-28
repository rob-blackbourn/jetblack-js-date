import { tzLocal } from './LocalTimezone'
import { startOfYear } from './startOfYear'
import { Timezone } from './Timezone'

const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000

/**
 * Find the week of the year for a given date.
 *
 * @category Miscellaneous
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The week of the year.
 */
export function weekOfYear(date: Date, tz: Timezone = tzLocal): number {
  const jan1 = startOfYear(date, tz)
  const daysBetween = (date.getTime() - jan1.getTime()) / MILLISECONDS_IN_DAY
  return 1 + Math.trunc(daysBetween / 7)
}
