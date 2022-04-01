import { daysInMonth } from './daysInMonth'
import { Timezone, tzLocal } from './timezone'

export const endOfMonth = (
  year: number,
  monthIndex: number,
  tz: Timezone = tzLocal
): Date => tz.makeDate(year, monthIndex, daysInMonth(year, monthIndex))
