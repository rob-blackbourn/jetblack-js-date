import { addDays } from './addDays'
import { Calendar, calWeekends } from './calendar'
import { Timezone, tzLocal } from './timezone'

export function nearestBusinessDay(
  date: Date,
  preferForward: boolean = true,
  cal: Calendar = calWeekends,
  tz: Timezone = tzLocal
): Date {
  if (!cal.isHoliday(date)) {
    return date
  }
  let forwardDate = addDays(date, 1, tz)
  let backwardDate = addDays(date, -1, tz)

  while (true) {
    const isForwardHoliday = cal.isHoliday(forwardDate)
    const isBackwardHoliday = !cal.isHoliday(backwardDate)
    if (!isForwardHoliday && (preferForward || isBackwardHoliday)) {
      return forwardDate
    } else if (!isBackwardHoliday) {
      return backwardDate
    }
    forwardDate = addDays(forwardDate, 1, tz)
    backwardDate = addDays(backwardDate, -1, tz)
  }
}
