import { addDuration, subDuration } from './arithmetic'
import { Duration } from './duration'
import { Timezone } from './timezone'
import { DateParts } from './types'
import { tzUtc } from './utcTimezone'
import { getClosestValues } from './utils'

/**
 * A line from the tzdata database.
 *
 * @category Timezone
 */
export interface TimezoneDelta {
  utc: Date
  local: Date
  offset: Duration
  abbr: string
  isDst: boolean
}

/**
 * An implementation for timezones using IANA data.
 *
 * @category Timezone
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

  year(date: Date): number {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.year(local)
  }

  monthIndex(date: Date): number {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.monthIndex(local)
  }

  weekday(date: Date): number {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.weekday(local)
  }

  day(date: Date): number {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.day(local)
  }

  hours(date: Date): number {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.hours(local)
  }

  minutes(date: Date): number {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.minutes(local)
  }

  seconds(date: Date): number {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.seconds(local)
  }

  milliseconds(date: Date): number {
    const delta = this.#findDelta(date)
    const local = addDuration(date, delta.offset)
    return tzUtc.milliseconds(local)
  }
}
