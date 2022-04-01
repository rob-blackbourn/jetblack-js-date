import { tzUtc } from './timezone'

export class Duration {
  static readonly #DURATION_PATTERN =
    /^(?<sign>-?[+-])?P((?<years>-?[+-]?\d+([.]\d+)?)Y)?((?<months>-?[+-]?\d+([.]\d+)?)M)?((?<weeks>-?[+-]?\d+([.]\d+)?)W)?((?<days>-?[+-]?\d+([.]\d+)?)D)?(T((?<hours>-?[+-]?\d+([.]\d+)?)H)?((?<minutes>-?[+-]?\d+([.]\d+)?)M)?((?<seconds>-?[+-]?\d+([.]\d+)?)S)?)?$/
  static readonly #ZERO_STRING = 'PT0S'

  #years: number
  #months: number
  #weeks: number
  #days: number
  #hours: number
  #minutes: number
  #seconds: number

  constructor(
    years: number,
    months: number,
    weeks: number = 0,
    days: number = 0,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0
  ) {
    const totalMinutes = minutes + Math.trunc(seconds / 60)
    const totalHours = hours + Math.trunc(totalMinutes / 60)
    const totalDays = days + Math.trunc(totalHours / 24)

    this.#seconds = seconds % 60
    this.#minutes = totalMinutes % 60
    this.#hours = totalHours % 24
    this.#days = totalDays % 7
    this.#weeks = weeks + Math.trunc(totalDays / 7)
    this.#months = months % 12
    this.#years = years + Math.trunc(months / 12)
  }

  #countSigns(): [number, number] {
    let positiveCount = 0,
      negativeCount = 0
    const values = [
      this.#years,
      this.#months,
      this.#weeks,
      this.#days,
      this.#hours,
      this.#minutes,
      this.#seconds
    ]
    for (const value of values) {
      if (value > 0) {
        ++positiveCount
      } else if (value < 0) {
        ++negativeCount
      }
    }
    return [positiveCount, negativeCount]
  }

  toString(): string {
    const [positiveCount, negativeCount] = this.#countSigns()
    if (positiveCount === 0 && negativeCount === 0) {
      return Duration.#ZERO_STRING
    }

    const sign = negativeCount > positiveCount ? -1 : 1

    let datePart = 'P'
    if (this.#years !== 0) {
      datePart += sign * this.#years + 'Y'
    }
    if (this.#months !== 0) {
      datePart += sign * this.#months + 'M'
    }
    if (this.#weeks !== 0) {
      datePart += sign * this.#weeks + 'W'
    }
    if (this.#days !== 0) {
      datePart += sign * this.#days + 'D'
    }

    let timePart = 'T'
    if (this.#hours !== 0) {
      timePart += sign * this.#hours + 'H'
    }
    if (this.#minutes !== 0) {
      timePart += sign * this.#minutes + 'M'
    }
    if (this.#seconds !== 0) {
      timePart += sign * this.#seconds + 'S'
    }

    if (timePart !== 'T') {
      datePart += timePart
    }

    if (sign === -1) {
      datePart = '-' + datePart
    }

    return datePart
  }

  get years(): number {
    return this.#years
  }

  set years(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#years = Math.trunc(value)
  }

  get months(): number {
    return this.#months
  }

  set months(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#months = Math.trunc(value) % 12
    this.years += Math.trunc(value / 12)
  }

  get weeks(): number {
    return this.#weeks
  }

  set weeks(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#weeks = value
  }

  get days(): number {
    return this.#days
  }

  set days(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#days = Math.trunc(value) % 7
    this.weeks += Math.trunc(value / 7)
  }

  get hours(): number {
    return this.#hours
  }

  set hours(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#hours = Math.trunc(value) % 24
    this.days += Math.trunc(value / 24)
  }

  get minutes(): number {
    return this.#minutes
  }

  set minutes(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#minutes = Math.trunc(value) % 60
    this.hours += Math.trunc(value / 60)
  }

  get seconds(): number {
    return this.#seconds
  }

  set seconds(value: number) {
    if (value < 0) {
      throw new RangeError('Value cannot be negative')
    }
    this.#seconds = Math.trunc(value) % 60
    this.minutes += Math.trunc(value / 60)
  }

  valueOf(): number {
    const totalDays =
      this.#years * 360 + this.#months * 30 * this.#weeks * 7 + this.#days
    const totalSeconds =
      this.#hours * 60 * 60 + this.#minutes * 60 + this.#seconds
    return totalDays * 24 * 60 * 60 + totalSeconds
  }

  static parse(text: string): Duration {
    const match = Duration.#DURATION_PATTERN.exec(text)
    if (match == null || match.groups == null) {
      throw new Error('Failed to parse duration')
    }
    const sign = match.groups.sign === '-' ? -1 : 1
    const years = sign * parseFloat(match.groups.years || '0'),
      months = sign * parseFloat(match.groups.months || '0'),
      weeks = sign * parseFloat(match.groups.weeks || '0'),
      days = sign * parseFloat(match.groups.days || '0'),
      hours = sign * parseFloat(match.groups.hours || '0'),
      minutes = sign * parseFloat(match.groups.minutes || '0'),
      seconds = sign * parseFloat(match.groups.seconds || '0')

    return new Duration(years, months, weeks, days, hours, minutes, seconds)
  }
}
