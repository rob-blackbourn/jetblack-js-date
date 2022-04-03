import { startOfWeek } from './startOfWeek'
import { Timezone, tzLocal } from './timezone'

/**
 * Find the week year for a given date.
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The week year.
 */
export function weekYear(date: Date, tz: Timezone = tzLocal): number {
  const year = tz.year(date)
  const startOfNextYear = startOfWeek(tz.makeDate(year + 1, 0, 1), tz)
  const startOfThisYear = startOfWeek(tz.makeDate(year, 0, 1), tz)

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}
