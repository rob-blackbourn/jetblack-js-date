Timezone-aware date manipulation for JavaScript.

## Overview

This is a toolkit for working with dates with timezones.

JavaScript provides
[Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
as a standard built-in object. It represents the date as the number of
milliseconds since 1 January 1970 UTC, and provides methods to manipulate the
date in the local and UTC timezones.The browser currently has no access to
the host's timezone database.

This library provides two things:

* Timezone aware convenience methods for manipulating dates.
* The ability to use IANA timezones (e.g. America/Chicago).

The
[IANA timezone database](https://www.iana.org/time-zones)
has been made available in JSON format by
a second project [jetblack-tzdata](https://github.com/rob-blackbourn/jetblack-tzdata).
This allows the timezone data to be accessed statically, or dynamically through
an HTTP GET (e.g. with `fetch`).

## What Next ?

See {@page guide/getting-started.md}
