The design choices are centered around efficiency and compatibility with the
standard JavaScript Date object.

### Months

The Date object treats `0` as the first month of the year, and this library
accepts that convention. Because this can feel a little odd, references to months
usually specify `monthIndex` as a reminder.

### Day of Week

The Date object treats `0` as Sunday, and this library accepts that convention.
This means functions like [[startOfWeek]] will return Sunday rather than Monday.

### Prefer Functions to Classes

While classes might provide a more elegant interface, few tree shaking libraries
and able to prune unused class methods, so functions are preferred to classes.

### No Unnecessary Functions

The [[addDays]] function has no complimentary `subDays` function, as this can
be achieved by making the `days` argument negative.
## What next ?

{@page ./calculations.md}
