import { daysInMonth } from './daysInMonth'
import { Timezone, tzLocal } from './timezone'

export function isEndOfMonth(date: Date, tz: Timezone = tzLocal): boolean {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    _hours,
    _minutes,
    _seconds,
    _milliseconds
  ] = tz.dateParts(date)
  return day === daysInMonth(year, monthIndex)
}
