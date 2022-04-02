import { Timezone, tzLocal } from './timezone'

export function addSeconds(
  date: Date,
  amount: number,
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
    year,
    monthIndex,
    day,
    hours,
    minutes,
    seconds + amount,
    milliseconds
  )
}
