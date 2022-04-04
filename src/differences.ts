import { startOfDay } from './anchors'
import { Timezone, tzLocal } from './timezone'
import { MILLISECONDS_IN_DAY } from './constants'

/**
 * Find the number of days between two dates.
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The number of days between the start of day on the start and end dates.
 */
export function diffInCalDays(
  leftDate: Date,
  rightDate: Date,
  tz: Timezone = tzLocal
) {
  const start = startOfDay(leftDate, tz)
  const end = startOfDay(rightDate, tz)

  const startTime = start.getTime() - tz.offset(start)
  const endTime = end.getTime() - tz.offset(end)

  return Math.round((startTime - endTime) / MILLISECONDS_IN_DAY)
}

/**
 * Find the number of months between two dates.
 *
 * @param leftDate The left date.
 * @param rightDate The right date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The number of months between two dates.
 */
export function diffInCalMonths(
  leftDate: Date,
  rightDate: Date,
  tz: Timezone = tzLocal
): number {
  const [leftYear, leftMonthIndex] = tz.dateParts(leftDate)
  const [rightYear, rightMonthIndex] = tz.dateParts(rightDate)

  const yearDiff = leftYear - rightYear
  const monthDiff = leftMonthIndex - rightMonthIndex

  return yearDiff * 12 + monthDiff
}
