import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { Calendar } from './Calendar'
import { calWeekends } from './WeekendCalendar'

/**
 * Find the nearest business date.
 *
 * @category Miscellaneous
 *
 * @param date The start date.
 * @param preferForward If true a future date is preferred if both directions have the same cost. Defaults to true.
 * @param cal The calendar to use to identify business days. Defaults to the weekend calendar.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The nearest business date.
 */
export function nearestBusinessDay(
  date: Date,
  preferForward: boolean = true,
  cal: Calendar = calWeekends,
  tz: Timezone = tzLocal
): Date {
  if (!cal.isHoliday(date, tz)) {
    return date
  }
  let forwardDate = addDays(date, 1, tz)
  let backwardDate = addDays(date, -1, tz)

  while (true) {
    const isForwardHoliday = cal.isHoliday(forwardDate, tz)
    const isBackwardHoliday = !cal.isHoliday(backwardDate, tz)
    if (!isForwardHoliday && (preferForward || isBackwardHoliday)) {
      return forwardDate
    } else if (!isBackwardHoliday) {
      return backwardDate
    }
    forwardDate = addDays(forwardDate, 1, tz)
    backwardDate = addDays(backwardDate, -1, tz)
  }
}
