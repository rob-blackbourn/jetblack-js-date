import { Timezone, tzLocal } from './timezone'
import { daysInMonth } from './daysInMonth'

export function isEndOfMonth(date: Date, tz: Timezone = tzLocal): boolean {
  const [year, monthIndex, day, _hours, _minutes, _seconds, _milliseconds] =
    tz.dateParts(date)
  return day === daysInMonth(year, monthIndex)
}
