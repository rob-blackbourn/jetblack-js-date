import { MILLISECONDS_IN_MINUTE } from './constants'
import { Timezone } from './Timezone'
import { DatePartRequest, DatePartResponse } from './types'
import { tzUtc } from './UTCTimezone'
import { getClosestValues } from './utils'

/**
 * A line from the tzdata database.
 *
 * @category Timezone
 */
export interface TimezoneOffset {
  /**
   * The from which this offset applies in milliseconds since 1 Jan 1970 UTC.
   */
  utc: number
  /**
   * The offset to be added to local time in minutes.
   */
  offset: number
  /**
   * The common timezone abbreviation.
   */
  abbr: string
  /**
   * If true the adjustment includes daylight savings time.
   */
  isDst: boolean
}

/**
 * An implementation for timezones using IANA data.
 *
 * @category Timezone
 */
export class IANATimezone extends Timezone {
  #deltas: TimezoneOffset[]

  /**
   * Construct a custom timezone.
   *
   * @param name The timezone name.
   * @param deltas The timezone offsets
   */
  constructor(name: string, deltas: TimezoneOffset[]) {
    super(name)
    this.#deltas = deltas
  }

  #findOffset(date: Date): TimezoneOffset {
    const [lo, hi] = getClosestValues(
      this.#deltas,
      date.getTime(),
      (a, b) => b.utc - a
    )
    return lo
  }

  #fromLocal(localDate: Date): Date {
    const delta = this.#findOffset(localDate)
    const utcDate = new Date(
      localDate.getTime() - delta.offset * MILLISECONDS_IN_MINUTE
    )
    return utcDate
  }

  #toLocal(utcDate: Date): Date {
    const delta = this.#findOffset(utcDate)
    const localDate = new Date(
      utcDate.getTime() + delta.offset * MILLISECONDS_IN_MINUTE
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

  dateParts(date: Date, request: DatePartRequest): DatePartResponse {
    const local = this.#toLocal(date)
    return tzUtc.dateParts(local, request)
  }

  offset(date: Date): number {
    const delta = this.#findOffset(date)
    return delta.offset
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
    const delta = this.#findOffset(date)
    return delta.isDst
  }
}
