Calculations which work on  business days require calendars.

Two calendars are provided out of the box:

* WeekendCalendar
* HolidayCalendar

## WeekendCalendar

The weekend calendar takes an array of weekdays which it considers to always be holiday dates.
By default the weekdays are Saturday and Sunday, and a concrete calendar is exported as `calWeekends`.
This is the default calendar used by business day functions.

## HolidayCalendar

The holiday calendar is built on top of the weekend calendar. As well as weekends it takes a list of
dates that are considered holidays.

Here is a simple calendar.

```js
const cal = new HolidayCalendar(
    'cal',
    [0, 6],
    [
    new Date('2015-01-01T00:00:00Z'), // New Years Day
    new Date('2015-04-03T00:00:00Z'), // Good Friday
    new Date('2015-04-06T00:00:00Z'), // Easter Monday
    new Date('2015-05-01T00:00:00Z'), // May Day
    new Date('2015-12-25T00:00:00Z'), // Christmas day
    new Date('2015-12-26T00:00:00Z')  // Boxing day
    ]
)
```

