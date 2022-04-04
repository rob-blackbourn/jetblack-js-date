import { Duration, addDuration, subDuration } from './duration'
import { DateParts } from './types'
import { getClosestValues, padNumber } from './utils'

/**
 * A line from the tzdata database.
 */
export interface TimezoneDelta {
  utc: Date
  local: Date
  offset: Duration
  abbr: string
  isDst: boolean
}

/**
 * The base class for timezones.
 */
export abstract class Timezone {
  /** @ignore */
  #name: string

  /**
   * Construct a new timezone.
   *
   * @param name The timezone name.
   */
  constructor(name: string) {
    this.#name = name
  }

  /**
   * Get the name of the timezone.
   */
  get name(): string {
    return this.#name
  }

  /**
   * Create a date from its component parts.
   *
   * @param year The year.
   * @param monthIndex The month index where January is 0.
   * @param day The day of the month.
   * @param hours The hour of the day.
   * @param minutes The minute of the day.
   * @param seconds The second of the day.
   * @param milliseconds The millisecond of the day.
   * @returns A new date built from the parts.
   */
  abstract makeDate(
    year: number,
    monthIndex: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ): Date

  /**
   * Extract the date parts.
   *
   * @param date The date.
   * @returns The date parts.
   */
  abstract dateParts(date: Date): DateParts

  /**
   * The signed offset in minutes from UTC for the given date.
   *
   * @param date The date.
   */
  abstract offset(date: Date): number

  /**
   * The year for the date.
   *
   * @param date The date.
   * @returns The year.
   */
  year(date: Date): number {
    const [
      year,
      _monthIndex,
      _weekDay,
      _day,
      _hours,
      _minutes,
      _seconds,
      _milliseconds
    ] = this.dateParts(date)
    return year
  }

  /**
   * The month index for the given date where 0 is January.
   *
   * @param date The date.
   * @returns The month index of the date where 0 is January.
   */
  monthIndex(date: Date): number {
    const [
      _year,
      monthIndex,
      _weekDay,
      _day,
      _hours,
      _minutes,
      _seconds,
      _milliseconds
    ] = this.dateParts(date)
    return monthIndex
  }

  /**
   * The day of the week for the given date where 0 is Sunday.
   *
   * @param date The date.
   * @returns The day of the week where 0 is Sunday.
   */
  weekDay(date: Date): number {
    const [
      _year,
      _monthIndex,
      weekDay,
      _day,
      _hours,
      _minutes,
      _seconds,
      _milliseconds
    ] = this.dateParts(date)
    return weekDay
  }

  /**
   * The day of the month for the given date.
   *
   * @param date The date.
   * @returns The day of the month.
   */
  day(date: Date): number {
    const [
      _year,
      _monthIndex,
      _weekDay,
      day,
      _hours,
      _minutes,
      _seconds,
      _milliseconds
    ] = this.dateParts(date)
    return day
  }

  /**
   * The hour of the day for the given date.
   *
   * @param date The date.
   * @returns The hour of the day.
   */
  hours(date: Date): number {
    const [
      _year,
      _monthIndex,
      _weekDay,
      _day,
      hours,
      _minutes,
      _seconds,
      _milliseconds
    ] = this.dateParts(date)
    return hours
  }

  /**
   * The minute of the day for the given date.
   *
   * @param date The date.
   * @returns The minute of the day.
   */
  minutes(date: Date): number {
    const [
      _year,
      _monthIndex,
      _weekDay,
      _day,
      _hours,
      minutes,
      _seconds,
      _milliseconds
    ] = this.dateParts(date)
    return minutes
  }

  /**
   * The second of the day for a given date.
   *
   * @param date The date.
   * @returns The second of the day.
   */
  seconds(date: Date): number {
    const [
      _year,
      _monthIndex,
      _weekDay,
      _day,
      _hours,
      _minutes,
      seconds,
      _milliseconds
    ] = this.dateParts(date)
    return seconds
  }

  /**
   * The millisecond of the day for a given date.
   *
   * @param date The date.
   * @returns The milliseconds of the day.
   */
  milliseconds(date: Date): number {
    const [
      _year,
      _monthIndex,
      _weekDay,
      _day,
      _hours,
      _minutes,
      _seconds,
      milliseconds
    ] = this.dateParts(date)
    return milliseconds
  }

  /**
   * The ISO 8601 date string representation for a given date.
   *
   * @param date The date.
   * @returns The ISO date string.
   */
  toISOString(date: Date) {
    const [
      year,
      monthIndex,
      _weekDay,
      day,
      hours,
      minutes,
      seconds,
      milliseconds
    ] = this.dateParts(date)
    const offset = this.offset(date)
    const offsetSign = Math.sign(offset)
    const offsetHours = offsetSign * Math.trunc(offset / 60)
    const offsetMinutes = offsetSign * (offset % 60)

    const datePart =
      padNumber(year, 4) +
      '-' +
      padNumber(monthIndex + 1, 2) +
      '-' +
      padNumber(day, 2)
    const timePart =
      padNumber(hours, 2) +
      ':' +
      padNumber(minutes, 2) +
      ':' +
      padNumber(seconds, 2) +
      (milliseconds !== 0 ? '.' + padNumber(milliseconds, 3) : '')
    const offsetPart =
      (offsetSign === -1 ? '-' : '+') +
      padNumber(offsetHours, 2) +
      ':' +
      padNumber(offsetMinutes, 2)
    return datePart + 'T' + timePart + offsetPart
  }
}

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
      date.getUTCDay(),
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
}

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
}

/**
 * The local timezone.
 */
export const tzUtc = new UtcTimezone()
/**
 * The timezone for UTC.
 */
export const tzLocal = new LocalTimezone()

/**
 * An implementation for timezones using IANA data.
 */
export class IANATimezone extends Timezone {
  #deltas: TimezoneDelta[]

  /**
   * Construct a custom timezone.
   *
   * @param name The timezone name.
   * @param deltas The timezone offsets
   */
  constructor(name: string, deltas: TimezoneDelta[]) {
    super(name)
    this.#deltas = deltas
  }

  #findDelta(date: Date): TimezoneDelta {
    const [lo, hi] = getClosestValues(
      this.#deltas,
      date,
      (a, b) => b.utc.getTime() - a.getTime()
    )
    return lo
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
    const delta = this.#findDelta(date)
    const local = subDuration(date, delta.offset)
    return local
  }

  dateParts(date: Date): DateParts {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.dateParts(local)
  }

  offset(date: Date): number {
    const delta = this.#findDelta(date)
    return delta.offset.hours * 60 + delta.offset.minutes
  }
}
