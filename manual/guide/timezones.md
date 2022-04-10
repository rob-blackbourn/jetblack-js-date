Most of the functions require a timezone, which if not passed defaults
to the local timezone.

The timezone takes over many of the duties of interacting with the built in
Date object, in the cases where timezone has an effect; for example in finding
the start of the day.

The timezones implement {@linkcode Timezone}.

## Local Timezone

The local timezone is provided by the {@linkcode tzLocal} constant. The following will
create a new date for the first of January 2000 in the timezone of the browser.

```js
import { tzLocal } from '@jetblack/date'

let jan1 = tzLocal.makeDate(2000, 0, 1)

// Equivalent to
jan1 = new Date(2000, 0, 1)
```

## UTC Timezone

The UTC timezone is provided by the `tzUtc` constant. The following will
create a new date for the first of January 2000 in the UTC timezone.

```js
import { tzUtc } from '@jetblack/date'

let jan1 = tzUtc.makeDate(2000, 0, 1)

// Equivalent to
jan1 = new Date(Date.UTC(2000, 0, 1))
```

## IANA Timezone

For detail on IANA timezones see {@page ./iana-timezones.md}.

The following create a new date for the first of January 200 in the
Europe/Brussels timezone.

```js
import { IANATimezone, dataToTimezoneOffset } from '../src'
import BRUSSELS_TZDATA from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new IANATimezone(
  'Europe/Brussels',
  BRUSSELS_TZDATA.map(dataToTimezoneOffset)
)

let jan1 = tzBrussels.makeDate(2000, 0, 1)

// Equivalent to adding the offset to UTC of one hour on 2000-01-01.
jan1 = new Date(Date.UTC(2000, 0, 1) + 60 * 60 * 1000)
```

## Other Methods

As well as making a date the timezone can be used to get the date parts: `year`,
`monthIndex`, `weekday`, `day`, `hours`, `minutes`, `seconds` and `milliseconds`. A
more general `dateparts` method can be used to get multiple parts for efficiency.

An `offset` method is provided which accepts a date argument and returns the
offset from UTC in minutes.

Finally the `toISOString` method is provided to display an ISO 8601 string with
the timezone offset.

## What next ?

{@page ./iana-timezones.md}
