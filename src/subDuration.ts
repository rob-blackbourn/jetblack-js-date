import { tzUtc } from './timezone'
import { Duration } from './duration'

export function subDuration(date: Date, duration: Duration): Date {
  const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
    tzUtc.dateParts(date)

  return tzUtc.makeDate(
    year - duration.years,
    monthIndex - duration.months,
    day - (duration.days + duration.weeks * 7),
    hours - duration.hours,
    minutes - duration.minutes,
    seconds - duration.seconds,
    milliseconds
  )
}
