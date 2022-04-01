import { Timezone, tzLocal, tzUtc } from './timezone'

export function addMinutes(
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
    hours,
    minutes + amount,
    seconds,
    milliseconds
  )
}
