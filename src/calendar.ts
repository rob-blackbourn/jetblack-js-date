export abstract class Calendar {
  #name: string

  constructor(name: string) {
    this.#name = name
  }

  get name(): string {
    return this.#name
  }

  abstract isHoliday(date: Date): boolean
}

export class WeekendCalendar extends Calendar {
  weekends: number[]

  constructor(weekends: number[] = [0, 6]) {
    super('WeekendCalendar')
    this.weekends = weekends
  }

  isWeekend(date: Date): boolean {
    const dayOfWeek = date.getDay()
    return this.weekends.some(x => x === dayOfWeek)
  }

  isHoliday(date: Date): boolean {
    return this.isWeekend(date)
  }
}

export const calWeekends = new WeekendCalendar()
