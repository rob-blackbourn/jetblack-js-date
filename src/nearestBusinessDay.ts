import { Calendar, calWeekends } from './calendar'
import { addDays } from './addDays'

export function nearestBusinessDay(
  date: Date,
  preferForward: boolean = true,
  cal: Calendar = calWeekends
): Date {
  if (!cal.isHoliday(date)) {
    return date
  }
  let forwardDate = addDays(date, 1)
  let backwardDate = addDays(date, -1)

  while (true) {
    const isForwardHoliday = cal.isHoliday(forwardDate)
    const isBackwardHoliday = !cal.isHoliday(backwardDate)
    if (!isForwardHoliday && (preferForward || isBackwardHoliday)) {
      return forwardDate
    } else if (!isBackwardHoliday) {
      return backwardDate
    }
    forwardDate = addDays(forwardDate, 1)
    backwardDate = addDays(backwardDate, -1)
  }
}
