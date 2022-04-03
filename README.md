# @jetblack/date

Date utilities for JavaScript.

This is work in progress!

## Overview

This project provides utilities for working with dates and timezones.

The built in Date object is a simple offset from an epoch. It provides functions
to resolve this into date components (days, months, years, etc.) in both the local
timezone of the browser, and UTC. A browser currently has no access to the hosts
timezone database.

This library provides two things:

* Convenience methods for manipulating dates in both UTC and the local timezone.
* The ability to use custom timezones.

The timezone database is provided by a second project [jetblack-tzdata](https://github.com/rob-blackbourn/jetblack-tzdata).
This allows the timezone data to be accessed statically, or dynamically through a HTTP GET (e.g. with `fetch`).

## Installation

The package can be installed from npmjs.

```bash
npm install --save @jetblack/date
```

## Usage

A date range could be calculated using UTC dates in the following manner:

```js
import { dayRange, tzUTC } from '@jetblack/date'

const everyDayInTheYear = dayRange(tzUTC.makeDate(2000, 1, 1), tzUtc.makeDate(2000, 12, 31), 1 tzUtc)
```

### Custom Timezones

If the required timezones are known in advance they can be installed as a package.

```bash
npm install --save @jetblack/tzdata
```

This installs JSON files with the timezone data. Depending on the environment plugins
you may be able to upload the JSON directly.

```js
import { CustomTimezone, objectToTimezoneDelta } from '../src'
import BRUSSELS_TZDATA from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new CustomTimezone(
  'Europe/Brussels',
  BRUSSELS_TZDATA.map(objectToTimezoneDelta)
)

const newYearsDay = tzBrussels.makeDate(2000, 1, 1)
console.log(newYearsDay)
```

When the required timezones are not known at build time they may be accessed dynamically.

```js
import { CustomTimezone, tzDataReviver } from '../src'

const timezoneName = 'Europe/Brussels'
fetch(`https://cdn.jsdelivr.net/npm/@jetblack/tzdata/dist/latest/${timezoneName}.json`)
  .then(response => response.text())
  .then(zoneDataText => {
    const zoneData = JSON.parse(zoneDataText, tzDataReviver)
    const tzBrussels = new CustomTimezone(timeZoneName, zoneData)
    const newYearsDay = tzBrussels.makeDate(2000, 1, 1)
    console.log(newYearsDay)        
  })
  .catch(error => console.error(error))
}
```
