## Start of Day

The start of the day depends on where you are in the world. Functions
like {@linkcode startOfDay}, {@linkcode startOfMonth}, etc. all need to know
the timezone.

## Daylight Savings Time

Daylight savings time (DST) presents an issue for date arithmetic.

The following example adds two days to the Saturday before the clocks
change using the local timezone (London) and UTC (which does not have DST).

```js
import { addDays, tzLocal, tzUtc }

// The local timezone here is London.
// In London on Sunday March 26 2000 the clocks go forward 1 hour.

const d1 = new Date('2000-03-25T12:00:00')
console.log(d1.toString())
// Sat Mar 25 2000 12:00:00 GMT+0000 (Greenwich Mean Time)

const d2 = addDays(d1, 2, tzLocal)
console.log(d2.toString())
// Mon Mar 27 2000 12:00:00 GMT+0100 (British Summer Time)
console.log((d2.getTime() - d1.getTime()) / 1000 / 60 / 60 + ' hours')
// 47 hours

const d3 = addDays(d1, 2, tzUtc)
console.log(d3.toString())
// Mon Mar 27 2000 13:00:00 GMT+0100 (British Summer Time)
console.log((d3.getTime() - d1.getTime()) / 1000 / 60 / 60 + ' hours')
// 48 hours
```

When using the local timezone the time of day appears unchanged, and the offset
become "GMT+0100 (British Summer Time)". When using UTC the time looks wrong!
Looking at the time differences we see that adding 2 days in the local timezone
was 47 hours, while with UTC it was 48 hours.

With the local timezone the "naturally correct" answer is returned.
However, the elapsed time will be an hour less than when using UTC.

Keeping the time change constant (as with UTC) can be useful when plotting
data, or doing time series calculations (rolling averages, resampling, etc.).

## Date Schedules

When generating date schedules (with {@linkcode dateRangeByDay} for example),
the timezone is important both for the start of day, and for the daylight
savings change.

If what you really want is periods of constant milliseconds, you should use
tzUtc as it has no DST.

## What next ?

{@page ./timezones.md}
