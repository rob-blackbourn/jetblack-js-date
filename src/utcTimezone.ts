import { Timezone } from './Timezone'
import { DatePartRequest, DatePartResponse } from './types'

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

  dateParts(date: Date, request: DatePartRequest): DatePartResponse {
    return {
      year: request.year ? date.getUTCFullYear() : 0,
      monthIndex: request.monthIndex ? date.getUTCMonth() : 0,
      weekday: request.weekday ? date.getUTCDay() : 0,
      day: request.day ? date.getUTCDate() : 0,
      hours: request.hours ? date.getUTCHours() : 0,
      minutes: request.minutes ? date.getUTCMinutes() : 0,
      seconds: request.seconds ? date.getUTCSeconds() : 0,
      milliseconds: request.milliseconds ? date.getUTCMilliseconds() : 0
    }
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
