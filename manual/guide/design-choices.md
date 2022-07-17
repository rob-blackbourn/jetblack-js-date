The design choices are centered around efficiency and compatibility with the
standard JavaScript Date object.

### Months

The Date object treats `0` as the first month of the year, and this library
accepts that convention. Because this can feel a little odd, references to months
usually specify `monthIndex` as a reminder.

### Day Of Week

The Date objects treats `0` as Sunday, and this library accepts that convention.
This means functions like `startOfWeek` will return Sunday rather than Monday.

### Prefer Functions to Classes

While classes might provide a more elegant interface, few tree shaking libraries
and able to prune unused class methods, so functions are preferred to classes.


## What next ?

{@page ./date-arithmetic.md}
