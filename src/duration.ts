export class Duration {
  static readonly #DURATION_PATTERN =
    /^P((?<years>-?\d+)Y)?((?<months>-?\d+)M)?((?<weeks>-?\d+)W)?((?<days>-?\d+)D)?(T((?<hours>-?\d+)H)?((?<minutes>-?\d+)M)?((?<seconds>-?\d+)S)?)?$/
  static readonly #ZERO_STRING = 'PT0S'

  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number

  constructor(
    years: number,
    months: number,
    weeks: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number
  ) {
    years = Math.trunc(years)
    months = Math.trunc(months)
    weeks = Math.trunc(weeks)
    days = Math.trunc(days)
    hours = Math.trunc(hours)
    minutes = Math.trunc(minutes)
    seconds = Math.trunc(seconds)

    const totalMinutes = minutes + Math.trunc(seconds / 60)
    const totalHours = hours + Math.trunc(totalMinutes / 60)
    const totalDays = days + Math.trunc(totalHours / 24)

    this.seconds = seconds % 60
    this.minutes = totalMinutes % 60
    this.hours = totalHours % 24
    this.days = totalDays % 7
    this.weeks = weeks + Math.trunc(totalDays / 7)
    this.months = months % 12
    this.years = years + Math.trunc(months / 12)
  }

  toString(): string {
    let datePart = 'P'
    if (this.years !== 0) {
      datePart += this.years + 'Y'
    }
    if (this.months !== 0) {
      datePart += this.months + 'M'
    }
    if (this.weeks !== 0) {
      datePart += this.weeks + 'W'
    }
    if (this.days !== 0) {
      datePart += this.days + 'D'
    }

    let timePart = 'T'
    if (this.hours !== 0) {
      timePart += this.hours + 'H'
    }
    if (this.minutes !== 0) {
      timePart += this.minutes + 'M'
    }
    if (this.seconds !== 0) {
      timePart += this.seconds + 'S'
    }

    if (timePart !== 'T') {
      return datePart + timePart
    } else if (datePart !== 'P') {
      return datePart
    } else {
      return Duration.#ZERO_STRING
    }
  }

  valueOf(): number {
    const totalDays =
      this.years * 360 + this.months * 30 * this.weeks * 7 + this.days
    const totalSeconds = this.hours * 60 * 60 + this.minutes * 60 + this.seconds
    return totalDays * 24 * 60 * 60 + totalSeconds
  }

  static parse(text: string): Duration {
    const match = Duration.#DURATION_PATTERN.exec(text)
    if (match == null || match.groups == null) {
      throw new Error('Failed to parse duration')
    }
    return new Duration(
      parseInt(match.groups.years || '0'),
      parseInt(match.groups.months || '0'),
      parseInt(match.groups.weeks || '0'),
      parseInt(match.groups.days || '0'),
      parseInt(match.groups.hours || '0'),
      parseInt(match.groups.minutes || '0'),
      parseInt(match.groups.seconds || '0')
    )
  }
}
