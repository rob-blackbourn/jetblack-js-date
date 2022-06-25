import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { Calendar } from './Calendar'
import { calWeekends } from './WeekendCalendar'

/**
 * Add business days to a date (or subtract if negative).
 *
 * If a calendar is not specified the weekend calendar is used.
 *
 * ```js
 * import { addBusinessDays } from '@jetblack/date'
 *
 * // Fri 7 Jan 2000
 * const date = addBusinessDays(new Date('2000-01-07T00:00:00Z'), 1)
 * console.log(date.getTime() === new Date('2000-01-10T00:00:00Z').getTime())
 * ```
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param count The number of days to add (or subtract if negative).
 * @param cal The calendar to use to identify dates which are holidays. Defaults to the weekend calendar.
 * @param tz An optional timezone. Defaults to the local timezone.
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
