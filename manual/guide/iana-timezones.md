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
import { IANATimezone, objectToTimezoneDelta } from '../src'
import BRUSSELS_TZDATA from '@jetblack/tzdata/dist/latest/Europe/Brussels.json'

const tzBrussels = new IANATimezone(
  'Europe/Brussels',
  // Convert the dates and durations from JSON strings to objects.
  BRUSSELS_TZDATA.map(objectToTimezoneDelta)
)

const newYearsDay = tzBrussels.makeDate(2000, 1, 1).toISOString()
// returns "2000-01-01T01:00:00Z"
```

## Dynamic

When the required timezones are not known at build time they may be accessed dynamically.
The [jsdelivr](https://www.jsdelivr.com/) content delivery network
is capable of serving individual files from the
[@jetblack/tzdata](https://www.npmjs.com/package/@jetblack/tzdata) npm package.

The following example shows how this can be done.

```js
import { IANATimezone, tzDataReviver } from '../src'

const timezoneName = 'Europe/Brussels'
fetch(`https://cdn.jsdelivr.net/npm/@jetblack/tzdata/dist/latest/${timezoneName}.json`)
  .then(response => response.text())
  .then(zoneDataText => {
    // Use a reviver to convert JSON strings to dates and durations.
    const zoneData = JSON.parse(zoneDataText, tzDataReviver)
    const tzBrussels = new IANATimezone(timeZoneName, zoneData)
    const newYearsDay = tzBrussels.makeDate(2000, 1, 1)
    // returns "2000-01-01T01:00:00Z"
  })
  .catch(error => console.error(error))
}
```

The list of all available zones is provided at `dist/latest/zones.json`.


## What next ?

{@page ./calendars.md}
