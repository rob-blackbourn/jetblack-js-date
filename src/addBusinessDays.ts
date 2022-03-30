import { Calendar, calWeekends } from './calendar'
import { addDays } from './addDays'

export function addBusinessDays(
  date: Date,
  count: number,
  cal: Calendar = calWeekends
): Date {
  const sign = count > 0 ? 1 : -1

  while (count !== 0) {
    date = addDays(date, sign)
    count -= sign

    while (cal.isHoliday(date)) {
      date = addDays(date, sign)
    }
  }
  return date
}
