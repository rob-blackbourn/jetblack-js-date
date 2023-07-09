Calculations which work on  business days require calendars.

Two calendars are provided out of the box:

* [[WeekendCalendar]]
* [[HolidayCalendar]]

## WeekendCalendar

The weekend calendar takes an array of weekdays which it considers to always be
holiday dates. By default the weekdays are Saturday and Sunday, and a concrete
calendar is exported as [[calWeekends]]. This is the default calendar used by
business day functions.

## HolidayCalendar

The holiday calendar is built on top of the weekend calendar. As well as weekends it takes a list of
dates that are considered holidays.

Here is a simple calendar.

```js
import { HolidayCalendar, tzLocal } from '@jetblack/date'

const cal = new HolidayCalendar(
  'cal',
  [6, 0], // Saturday and Sunday
  [
    tzLocal.makeDate(2015, 0, 1),   // New Years Day
    tzLocal.makeDate(2015, 3, 3),   // Good Friday
    tzLocal.makeDate(2015, 3, 6),   // Easter Monday
    tzLocal.makeDate(2015, 4, 1),   // May Day
    tzLocal.makeDate(2015, 11, 25), // Christmas day
    tzLocal.makeDate(2015, 11, 26)  // Boxing day
  ],
  tzLocal
)
```

## Custom Calendars

You can make your own calendars. The following abstract class provides a calendar
which caches the holidays for a year.

```ts
import { WeekendCalendar, Timezone, startOfDay, tzLocal } from "@jetblack/date"; 

export abstract class YearlyCalendar extends WeekendCalendar {

    private holidays: Map<number, Map<number, string>> = new Map()

    constructor (name: string, weekends: number[] = [0, 6]) {
        super(name, weekends)
    }

    public override isHoliday(date: Date, tz: Timezone = tzLocal): boolean {
        if (this.isWeekend(date, tz)) {
            return true
        }

        const year = tz.year(date)
        if (!this.holidays.has(year)) {
            this.holidays.set(year, this.fetchHolidays(year, tz))
        }

        const yearHolidays = this.holidays.get(year)
        return yearHolidays.has(startOfDay(date, tz).getTime())
    }

    protected abstract fetchHolidays(year: number, tz: Timezone): Map<number, string> 
}
```

With the above we can create a rules based calendar.

```ts
import { Timezone, easter, addDays } from "@jetblack/date"
import { YearlyCalendar } from "./YearlyCalendar"

export class Target extends YearlyCalendar {
    constructor() {
        super("TARGET", [0, 6])
    }

    protected override fetchHolidays(year: number, tz: Timezone): Map<number, string> {
        const holidays: Map<number, string> = new Map()

        holidays.set(tz.makeDate(year, 0, 1).getTime(), "New Year's Day")

        if (year >= 2000) {
            const easterSunday = easter(year, tz)
            holidays.set(addDays(easterSunday, -2, tz).getTime(), "Good Friday")
            holidays.set(addDays(easterSunday, 1, tz).getTime(), "Easter Monday")
        }

        if (year >= 2000) {
            holidays.set(tz.makeDate(year, 4, 1).getTime(), "Labor Day")
        }

        holidays.set(tz.makeDate(year, 11, 25).getTime(), "Christmas Day")

        if (year >= 2000) {
            holidays.set(tz.makeDate(year, 11, 26).getTime(), "Christmas Holiday")
        }

        if (year === 1998 || year === 1999 || year === 2001) {
            holidays.set(tz.makeDate(year, 11, 31).getTime(), "New Year's Eve")
        }

        return holidays
    }
}
```
