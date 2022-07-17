# Static vs Dynamic

## Static

If the required timezones are known in advance they can be installed directly.
The IANA timezone database has been converted to JSON format and bundled into
an npm package. The following installs the package

```bash
npm install --save @jetblack/tzdata
```

Depending on the environment plugins you may be able to import the JSON directly.

```js
import { IANATimezone, dataToTimezoneOffset } from '@jetblack/date'
import BRUSSELS_TZDATA from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new IANATimezone(
  'Europe/Brussels',
  // Convert the dates and durations from JSON strings to objects.
  BRUSSELS_TZDATA.map(dataToTimezoneOffset)
)

const newYearsDay = tzBrussels.makeDate(2000, 0, 1).toISOString()
// returns "2000-01-01T01:00:00Z"
```

There is a utility function [[`loadTimezone`]] which wraps this up using
[dynamic imports](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import).

```js
import { loadTimezone } from '@jetblack/date'

const tzChicago = await loadTimezone('America/Chicago')
console.log(tzChicago.makeDate(2022, 12, 25).toISOString())
// 2023-01-25T06:00:00.000Z
```


## Dynamic

When the required timezones are not known at build time they may be accessed dynamically.
The [jsdelivr](https://www.jsdelivr.com/) content delivery network
is capable of serving individual files from the
[@jetblack/tzdata](https://www.npmjs.com/package/@jetblack/tzdata) npm package.

The following example shows how this can be done using the minified version
of the data.

```js
import { IANATimezone, minDataToTimezoneOffset } from '@jetblack/date'

const timezoneName = 'Europe/Brussels'
fetch(`https://cdn.jsdelivr.net/npm/@jetblack/tzdata/dist/latest/${timezoneName}.min.json`)
  .then(response => response.json())
  .then(data => {
    const zoneData = data.map(minDataToTimezoneOffset)
    const tzBrussels = new IANATimezone(timeZoneName, zoneData)
    const newYearsDay = tzBrussels.makeDate(2000, 0, 1)
    // returns "2000-01-01T01:00:00Z"
  })
  .catch(error => console.error(error))
}
```

There is a utility function [[`fetchTimezone`]] which wraps this up.

```js
import { fetchTimezone } from '@jetblack/date'

const tzChicago = await fetchTimezone('America/Chicago')
console.log(tzChicago.makeDate(2022, 12, 25).toISOString())
// 2023-01-25T06:00:00.000Z
```

The list of all available zones is provided at `dist/latest/zones.json`.


## What next ?

{@page ./calendars.md}
