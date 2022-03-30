import { tzUtc } from './timezone'

export function addMonths(date: Date, amount: number): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tzUtc.dateParts(date)
  return tzUtc.makeDate(
    year,
    monthIndex + amount,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
