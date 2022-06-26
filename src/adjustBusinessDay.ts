import { Calendar } from './Calendar'
import { calWeekends } from './WeekendCalendar'
import { nearestBusinessDay } from './nearestBusinessDay'
import { Timezone } from './Timezone'
import { tzLocal } from './LocalTimezone'
import { addBusinessDays } from './addBusinessDays'

/**
 * Business day conventions
 */
export enum BusinessDayConvention {
  /** No adjustment */
  NONE = 0,
  /** Adjust to the nearest business day */
  NEAREST = 1,
  /** Adjust to the nearest business day before the current day */
  PRECEDING = 2,
  /** Adjust to the nearest business day after the current day */
  FOLLOWING = 3,
  /** Adjust to the nearest business day after the current day withing the month; otherwise adjust preceding */
  MODIFIED_PRECEDING = 4,
  /** Adjust to the nearest business day after the current day withing the month; otherwise adjust following */
  MODIFIED_FOLLOWING = 5
}

/**
 * Adjusts a non-business day to the appropriate nearest business day.
 *
 * ```js
 * const d1 = new Date('2000-01-01')
 * console.log(d1)
 * // Sat Jan 01 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 *
 * const d2 = adjustBusinessDay(d1, BusinessDayConvention.FOLLOWING)
 * console.log(d2.toString())
 * // Mon Jan 03 2000 00:00:00 GMT+0000 (Greenwich Mean Time)
 *
 * const d3 = adjustBusinessDay(d1, BusinessDayConvention.PRECEDING)
 * console.log(d3.toString())
 * // Fri Dec 31 1999 00:00:00 GMT+0000 (Greenwich Mean Time)
 * ```
 *
 * @param date The date.
 * @param convention The business day conventions. Defaults to BusinessDayConvention.FOLLOWING.
 * @param prefer_forward If true prefer the nearest business day in the future. Defaults to true.
 * @param cal An optional holiday calendar. Defaults to calWeekend.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The adjusted date.
 */
export function adjustBusinessDay(
  date: Date,
  convention: BusinessDayConvention = BusinessDayConvention.FOLLOWING,
  prefer_forward: boolean = true,
  cal: Calendar = calWeekends,
  tz: Timezone = tzLocal
): Date {
  if (convention === BusinessDayConvention.NONE || !cal.isHoliday(date)) {
    return date
  } else if (convention === BusinessDayConvention.NEAREST) {
    return nearestBusinessDay(date, prefer_forward, cal, tz)
  } else if (convention == BusinessDayConvention.FOLLOWING) {
    return addBusinessDays(date, 1, cal, tz)
  } else if (convention == BusinessDayConvention.PRECEDING) {
    return addBusinessDays(date, -1, cal, tz)
  } else if (convention == BusinessDayConvention.MODIFIED_FOLLOWING) {
    const adjustedDate = addBusinessDays(date, 1, cal, tz)

    if (tz.monthIndex(adjustedDate) == tz.monthIndex(date)) {
      return adjustedDate
    } else {
      return addBusinessDays(date, -1, cal, tz)
    }
  } else if (convention == BusinessDayConvention.MODIFIED_PRECEDING) {
    const adjustedDate = addBusinessDays(date, -1, cal, tz)

    if (tz.monthIndex(adjustedDate) == tz.monthIndex(date)) {
      return adjustedDate
    } else {
      return addBusinessDays(date, 1, cal, tz)
    }
  } else {
    throw new RangeError('Invalid business day convention')
  }
}
