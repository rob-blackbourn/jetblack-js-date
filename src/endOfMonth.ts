import { Timezone, tzLocal } from './timezone'
import { daysInMonth } from './daysInMonth'

export const endOfMonth = (
  year: number,
  monthIndex: number,
  tz: Timezone = tzLocal
): Date => tz.makeDate(year, monthIndex, daysInMonth(year, monthIndex))
