import { Timezone } from './Timezone'
import { tzUtc } from './UTCTimezone'
import { MILLISECONDS_IN_MINUTE } from './constants'
import { DatePartResponse } from './types'

const localeUS = 'en-US'
const datePatternUS = /(\d+).(\d+).(\d+),?\s+(\d+).(\d+)(.(\d+))?/
const utcDateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  timeZone: 'UTC',
  hourCycle: 'h23',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric'
}
const formatDateUTC = new Intl.DateTimeFormat(localeUS, utcDateTimeFormatOptions)

interface DateParts {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

function parseDate(dateText: string): DateParts {
  dateText = dateText.replace(/[\u200E\u200F]/g, '')
  const matches = datePatternUS.exec(dateText)
  if (matches == null) {
    throw new Error('Failed to parse date')
  }
  const [month, day, year, hour, minute] = matches
    .slice(1, 6)
    .map(x => parseInt(x))
  return { month, day, year, hour, minute }
}

function diffMinutes(d1: DateParts, d2: DateParts): number {
  var day = d1.day - d2.day
  var hour = d1.hour - d2.hour
  var min = d1.minute - d2.minute

  if (day > 15) day = -1
  if (day < -15) day = 1

  return 60 * (24 * day + hour) + min
}

function getTimezoneOffset(date: Date, timeZone: string) {
  const formatOptions: Intl.DateTimeFormatOptions = {
    ...utcDateTimeFormatOptions,
    timeZone,
  }

  var formatDateTz = new Intl.DateTimeFormat(localeUS, formatOptions)

  return -diffMinutes(
    parseDate(formatDateUTC.format(date)),
    parseDate(formatDateTz.format(date))
  )
}

export class IntlTimezone extends Timezone {
  /**
   * Construct a custom timezone.
   *
   * @param name The timezone name.
   * @param deltas The timezone offsets
   */
  constructor(name: string) {
    super(name)
  }

  /** @ignore */
  #fromLocal(localDate: Date): Date {
    const utcDate = new Date(
      localDate.getTime() - this.offset(localDate) * MILLISECONDS_IN_MINUTE
    )
    return utcDate
  }

  /** @ignore */
  #toLocal(utcDate: Date): Date {
    const localDate = new Date(
      utcDate.getTime() + this.offset(utcDate) * MILLISECONDS_IN_MINUTE
    )
    return localDate
  }

  makeDate(
    year: number,
    monthIndex: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ): Date {
    const date = tzUtc.makeDate(
      year,
      monthIndex,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    )
    return this.#fromLocal(date)
  }

  dateParts(date: Date): DatePartResponse {
    const local = this.#toLocal(date)
    return tzUtc.dateParts(local)
  }

  offset(date: Date): number {
    return getTimezoneOffset(date, this.name)
  }

  year(date: Date): number {
    const local = this.#toLocal(date)
    return tzUtc.year(local)
  }

  monthIndex(date: Date): number {
    const local = this.#toLocal(date)
    return tzUtc.monthIndex(local)
  }

  weekday(date: Date): number {
    const local = this.#toLocal(date)
    return tzUtc.weekday(local)
  }

  day(date: Date): number {
    const local = this.#toLocal(date)
    return tzUtc.day(local)
  }

  hours(date: Date): number {
    const local = this.#toLocal(date)
    return tzUtc.hours(local)
  }

  minutes(date: Date): number {
    const local = this.#toLocal(date)
    return tzUtc.minutes(local)
  }

  seconds(date: Date): number {
    const local = this.#toLocal(date)
    return tzUtc.seconds(local)
  }

  milliseconds(date: Date): number {
    const local = this.#toLocal(date)
    return tzUtc.milliseconds(local)
  }

  isDaylightSavings(date: Date): boolean {
    const year = this.year(date)
    const currentOffset = this.offset(date)
    const jan1Offset = this.offset(this.makeDate(year, 0, 1))
    const jul1Offset = this.offset(this.makeDate(year, 6, 1))
    if (jan1Offset < jul1Offset) {
      // Northern hemisphere
      return currentOffset === jul1Offset
    } else if (jan1Offset > jul1Offset) {
      // Southern hemisphere
      return currentOffset === jan1Offset
    } else {
      return false
    }
  }
}
