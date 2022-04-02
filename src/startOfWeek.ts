import { addDays } from './addDays'
import { startOfDay } from './startOfDay'
import { Timezone, tzLocal } from './timezone'

export function startOfWeek(date: Date, tz: Timezone = tzLocal): Date {
  const weekDay = tz.weekDay(date)
  return addDays(startOfDay(date, tz), -weekDay, tz)
}
