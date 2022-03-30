import { tzUtc } from './timezone'

export function addYears(date: Date, amount: number): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tzUtc.dateParts(date)
  return tzUtc.makeDate(
    year + amount,
    monthIndex,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}
