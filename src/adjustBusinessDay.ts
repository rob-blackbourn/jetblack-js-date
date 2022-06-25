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
  NONE = 0,
  NEAREST = 1,
  PRECEDING = 2,
  FOLLOWING = 3,
  MODIFIED_PRECEDING = 4,
  MODIFIED_FOLLOWING = 5
}

/**
 * Adjusts a non-business day to the appropriate nearest business day.
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
