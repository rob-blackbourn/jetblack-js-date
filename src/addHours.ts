import { Timezone, tzLocal } from './timezone'

export function addHours(
  date: Date,
  amount: number,
  tz: Timezone = tzLocal
): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex,
    day,
    hours + amount,
    minutes,
    seconds,
    milliseconds
  )
}
