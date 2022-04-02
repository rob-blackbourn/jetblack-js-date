import { addDuration } from './addDuration'
import { Duration } from './duration'
import { subDuration } from './subDuration'
import { DateParts } from './types'
import { getClosestValues, padNumber } from './utils'

export interface TimezoneDelta {
  utc: Date
  local: Date
  offset: Duration
  abbr: string
  isDst: boolean
}

export abstract class Timezone {
  #name: string

  constructor(name: string) {
    this.#name = name
  }

  get name(): string {
    return this.#name
  }

  abstract makeDate(
    year: number,
    monthIndex: number,
    day?: number,
    hours?: number,
    minutes?: number,
    seconds?: number,
    milliseconds?: number
  ): Date

  abstract dateParts(date: Date): DateParts

  abstract offset(date: Date): number

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

export class UtcTimezone extends Timezone {
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

export class LocalTimezone extends Timezone {
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

export const tzUtc = new UtcTimezone()
export const tzLocal = new LocalTimezone()

export class CustomTimezone extends Timezone {
  #deltas: TimezoneDelta[]

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
