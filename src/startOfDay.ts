import { Timezone, tzLocal } from './timezone'

export function startOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const [year, monthIndex, day] = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, day)
}
