import { addDays } from './addDays'
import { Calendar, calWeekends } from './calendar'
import { Timezone, tzLocal } from './timezone'

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
