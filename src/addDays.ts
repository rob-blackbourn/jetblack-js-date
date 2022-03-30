import { tzUtc } from './timezone'

export function addDays(date: Date, amount: number): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tzUtc.dateParts(date)
  return tzUtc.makeDate(
    year,
    monthIndex,
    day + amount,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
