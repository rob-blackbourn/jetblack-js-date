import { Duration } from './duration'
import { Timezone, tzLocal, tzUtc } from './timezone'

export function subDuration(
  date: Date,
  duration: Duration,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year - duration.years,
    monthIndex - duration.months,
    day - (duration.days + duration.weeks * 7),
    hours - duration.hours,
    minutes - duration.minutes,
    seconds - duration.seconds,
    milliseconds
  )
}
