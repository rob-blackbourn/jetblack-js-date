# @jetblack/date

Timezone aware date manipulation for JavaScript.

This is work in progress!

## Overview

This project provides utilities for working with dates and timezones.

The JavaScript built in [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
object is a simple offset from an epoch. It provides functions
to resolve this into date components (days, months, years, etc.) in both the local
timezone of the browser, and UTC. A browser currently has no access to the hosts
timezone database.

This library provides two things:

* Convenience methods for manipulating dates in both UTC and the local timezone.
* The ability to use IANA timezones (e.g. America/Chicago).

The IANA timezone database has been made available in JSON format by
a second project [jetblack-tzdata](https://github.com/rob-blackbourn/jetblack-tzdata).
This allows the timezone data to be accessed statically, or dynamically through a HTTP GET (e.g. with `fetch`).

## Installation

The package can be installed from npmjs.

```bash
npm install --save @jetblack/date
```

## Usage

A range of dates could be calculated using UTC dates in the following manner:

```js
import { dayRange, tzUTC } from '@jetblack/date'

const start = tzUTC.makeDate(2000, 1, 1)
const end = tzUtc.makeDate(2000, 12, 31)
const step = 1 // one day

const everyDayInTheYear = dayRange(start, end, step, tzUtc)
  .map(d => d.toISOString())
// returns [ "2000-01-01T00:00:00Z", "2000-01-02T00:00:00Z", ..., "2000-12-31T00:00:00Z" ]
```

### Custom Timezones

If the required timezones are known in advance they can be installed directly.
The IANA timezone database has been converted to JSON format and bundled into
an npm package. The following installs the package

```bash
npm install --save @jetblack/tzdata
```

This installs JSON files with the timezone data. Depending on the environment plugins
you may be able to import the JSON directly.

```js
import { CustomTimezone, objectToTimezoneDelta } from '../src'
import BRUSSELS_TZDATA from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new CustomTimezone(
  'Europe/Brussels',
  BRUSSELS_TZDATA.map(objectToTimezoneDelta)
)

const newYearsDay = tzBrussels.makeDate(2000, 1, 1)
// returns 
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

The above example demonstrates how the [jsdelivr](https://www.jsdelivr.com/) content delivery
network can be leveraged to serve the timezone data, through it's ability to access individual
files.

The list of all available zones is provided at `dist/latest/zones.json`.
