import { Timezone, tzLocal } from './timezone'

export function endOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const [year, monthIndex, _weekDay, day] = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, day, 23, 59, 59, 999)
}
