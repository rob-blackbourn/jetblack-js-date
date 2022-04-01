import { tzLocal, Timezone } from './timezone'

export function addDays(
  date: Date,
  amount: number,
  tz: Timezone = tzLocal
): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex,
    day + amount,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
