import { Timezone } from './timezone'
import { DateParts } from './types'

class UtcTimezone extends Timezone {
  constructor() {
    super('UTC')
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
      Date.UTC(year, monthIndex, day, hours, minutes, seconds, milliseconds)
    )
  }

  dateParts(date: Date): DateParts {
    return [
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
      date.getUTCMilliseconds()
    ]
  }

  offset(date: Date): number {
    return 0
  }

  toISOString(date: Date): string {
    return date.toISOString()
  }

  year(date: Date): number {
    return date.getUTCFullYear()
  }

  monthIndex(date: Date): number {
    return date.getUTCMonth()
  }

  weekday(date: Date): number {
    return date.getUTCDay()
  }

  day(date: Date): number {
    return date.getUTCDate()
  }

  hours(date: Date): number {
    return date.getUTCHours()
  }

  minutes(date: Date): number {
    return date.getUTCMinutes()
  }

  seconds(date: Date): number {
    return date.getUTCSeconds()
  }

  milliseconds(date: Date): number {
    return date.getUTCMilliseconds()
  }
}

/**
 * The timezone for UTC.
 *
 * @category Timezone
 */
export const tzUtc = new UtcTimezone()
