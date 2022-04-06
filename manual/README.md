Timezone-aware date manipulation for JavaScript.

This is work in progress!

## Overview

This project provides utilities for working with dates and timezones.

The JavaScript built-in [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
object is a simple offset from an epoch. It provides functions
to resolve this into date components (days, months, years, etc.) in both the local
timezone of the browser, and UTC. A browser currently has no access to the host's
timezone database.

This library provides two things:

* Convenience methods for manipulating dates in both UTC and the local timezone.
* The ability to use IANA timezones (e.g. America/Chicago).

The
[IANA timezone database](https://www.iana.org/time-zones)
has been made available in JSON format by
a second project [jetblack-tzdata](https://github.com/rob-blackbourn/jetblack-tzdata).
This allows the timezone data to be accessed statically, or dynamically through a HTTP GET (e.g. with `fetch`).

## What Next ?

See {@page guide/getting-started.md}
