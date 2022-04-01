import { Timezone, tzLocal, tzUtc } from './timezone'

export function addMonths(
  date: Date,
  amount: number,
  tz: Timezone = tzLocal
): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex + amount,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
