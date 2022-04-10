import { Timezone } from './Timezone'
import { DatePartRequest, DatePartResponse } from './types'
import { tzUtc } from './UTCTimezone'
import { getClosestValues } from './utils'
import { addMinutes } from './addMinutes'

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
    const delta = this.#findOffset(date)
    const local = addMinutes(date, -delta.offset)
    return local
  }

  dateParts(date: Date, request: DatePartRequest): DatePartResponse {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.dateParts(local, request)
  }

  offset(date: Date): number {
    const delta = this.#findOffset(date)
    return delta.offset
  }

  year(date: Date): number {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.year(local)
  }

  monthIndex(date: Date): number {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.monthIndex(local)
  }

  weekday(date: Date): number {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.weekday(local)
  }

  day(date: Date): number {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.day(local)
  }

  hours(date: Date): number {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.hours(local)
  }

  minutes(date: Date): number {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.minutes(local)
  }

  seconds(date: Date): number {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.seconds(local)
  }

  milliseconds(date: Date): number {
    const delta = this.#findOffset(date)
    const local = addMinutes(date, delta.offset)
    return tzUtc.milliseconds(local)
  }

  isDaylightSavings(date: Date): boolean {
    const delta = this.#findOffset(date)
    return delta.isDst
  }
}
