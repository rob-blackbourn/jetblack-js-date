import { Timezone, tzLocal } from './timezone'

export function findWeekdayIndex(
  dates: Date[],
  dow: number,
  tz: Timezone = tzLocal
): number {
  for (let i = 0; i < dates.length; ++i) {
    if (tz.weekDay(dates[i]) === dow) {
      return i
    }
  }
  return -1
}

export function lastWeekdayIndexOf(
  dates: Date[],
  dow: number,
  tz: Timezone = tzLocal
): number {
  for (let i = dates.length - 1; i >= 0; --i) {
    if (tz.weekDay(dates[i]) === dow) {
      return i
    }
  }
  return -1
}
