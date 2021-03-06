## Installation

The package can be installed from [npmjs](https://www.npmjs.com/package/@jetblack/date).

```bash
npm install --save @jetblack/date
```

## Convenience Methods

The library provides the usual convenience methods (e.g. [[addDays]], [[startOfDay]], etc.),
but with the addition of a timezone where necessary.

```js
import { startOfToday, tzLocal, tzUtc } from '@jetblack/date'

// Get the start of today relative to the local timezone.
const todayLocal = startOfToday()

// If the timezone isn't specified, it defaults to the local timezone.
// The following passes it explicitly.
const todayLocalExplicit = startOfToday(tzLocal)

// The start of today relative to UTC can be found by passing the UTC timezone.
const todayUTC = startOfToday(tzUtc)

// If the browser had timezone information the following would find the
// start of the day in Tokyo.
// const todayTokyo = startOfToday(tzTokyo)
```

## What next ?

{@page ./design-choices.md}
