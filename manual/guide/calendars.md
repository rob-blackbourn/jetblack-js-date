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
