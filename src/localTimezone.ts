import { Timezone } from './timezone'
import { DateParts } from './types'

class LocalTimezone extends Timezone {
  constructor() {
    super(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }

  makeDate(
    year: number,
    monthIndex: number,
    day: number = 0,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    milliseconds: number = 0
  ): Date {
    return new Date(
      year,
      monthIndex,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    )
  }

  dateParts(date: Date): DateParts {
    return [
      date.getFullYear(),
      date.getMonth(),
      date.getDay(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    ]
  }

  offset(date: Date): number {
    return date.getTimezoneOffset()
  }

  year(date: Date): number {
    return date.getFullYear()
  }

  monthIndex(date: Date): number {
    return date.getMonth()
  }

  weekDay(date: Date): number {
    return date.getDay()
  }

  day(date: Date): number {
    return date.getDate()
  }

  hours(date: Date): number {
    return date.getHours()
  }

  minutes(date: Date): number {
    return date.getMinutes()
  }

  seconds(date: Date): number {
    return date.getSeconds()
  }

  milliseconds(date: Date): number {
    return date.getMilliseconds()
  }
}

/**
 * The local timezone.
 *
 * @category Timezone
 */
export const tzLocal = new LocalTimezone()
