import { Timezone, tzLocal } from './timezone'

export function addYears(
  date: Date,
  amount: number,
  tz: Timezone = tzLocal
): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tz.dateParts(date)

  return tz.makeDate(
    year + amount,
    monthIndex,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
