import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * Add or subtract a number of different days of the week.
 *
 * If the start date lies on the specified day of the week and the strictly
 * different flag is false, the current date would be considered the first
 * day of the week.
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param nth The number of week days.
 * @param dow The day of the week where Sunday is 0.
 * @param strictlyDifferent When true the returned date must be different to the start date.
 * @returns The nth week day.
 */
export function addNthDayOfWeek(
  date: Date,
  nth: number,
  dow: number,
  strictlyDifferent: boolean,
  tz: Timezone = tzLocal
): Date {
  if (nth === 0) {
    return date
  }

  if (dow < 0 || dow > 6) {
    throw new RangeError('0 <= dow <= 6')
  }

  let diff = dow - tz.weekday(date)

  if (diff == 0 && strictlyDifferent) {
    nth += nth >= 0 ? 1 : -1
  }

  if (nth > 0) {
    if (diff < 0) {
      diff += 7
    }

    const adjustedStartDate = addDays(date, diff, tz)
    const endDate = addDays(adjustedStartDate, (nth - 1) * 7, tz)
    return endDate
  } else {
    if (diff > 0) {
      diff -= 7
    }

    const adjustedStartDate = addDays(date, diff, tz)
    const endDate = addDays(adjustedStartDate, (nth + 1) * 7, tz)
    return endDate
  }
}
