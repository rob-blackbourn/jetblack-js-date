import { Timezone } from './Timezone'
import { DatePartResponse } from './types'

class LocalTimezone extends Timezone {
  constructor() {
    super(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }

  makeDate(
    year: number,
    monthIndex: number,
    day: number = 1,
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

  dateParts(date: Date): DatePartResponse {
    return {
      year: date.getFullYear(),
      monthIndex: date.getMonth(),
      weekday: date.getDay(),
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
      milliseconds: date.getMilliseconds()
    }
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

  weekday(date: Date): number {
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

  isDaylightSavings(date: Date): boolean {
    const currentYear = date.getFullYear()
    const offsetJan = new Date(currentYear, 0, 1).getTimezoneOffset()
    const offsetJul = new Date(currentYear, 6, 1).getTimezoneOffset()
    const summerOffset = Math.max(offsetJan, offsetJul)
    return date.getTimezoneOffset() === summerOffset
  }
}

/**
 * The local timezone.
 *
 * @category Timezone
 */
export const tzLocal = new LocalTimezone()
