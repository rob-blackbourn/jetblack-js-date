import { tzUtc } from './timezone'

export function addSeconds(date: Date, amount: number): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tzUtc.dateParts(date)
  return tzUtc.makeDate(
    year,
    monthIndex,
    day,
    hours,
    minutes,
    seconds + amount,
    milliseconds
  )
}
