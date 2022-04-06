import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { Calendar } from './Calendar'
import { calWeekends } from './WeekendCalendar'

/**
 * Add business days to a date (or subtract if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param count The number of days to add (or subtract if negative).
 * @param cal The calendar to use to identify dates which are holidays.
 * @param tz An optional timezone. Defaults to `tzLocal`.
 * @returns A new date adjusted by business days.
 */
export function addBusinessDays(
  date: Date,
  count: number,
  cal: Calendar = calWeekends,
  tz: Timezone = tzLocal
): Date {
  const sign = count > 0 ? 1 : -1

  while (count !== 0) {
    date = addDays(date, sign, tz)
    count -= sign

    while (cal.isHoliday(date)) {
      date = addDays(date, sign, tz)
    }
  }
  return date
}
