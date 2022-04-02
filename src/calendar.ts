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

  constructor(name: string = 'WeekendCalendar', weekends: number[] = [0, 6]) {
    super(name)
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

export class HolidayCalendar extends WeekendCalendar {
  #holidays: Set<number>

  constructor(name: string, weekends: number[] = [0, 6], holidays: Date[]) {
    super(name, weekends)
    this.#holidays = new Set(holidays.map(x => x.getTime()))
  }

  isHoliday(date: Date): boolean {
    return this.isWeekend(date) || this.#holidays.has(date.getTime())
  }
}
