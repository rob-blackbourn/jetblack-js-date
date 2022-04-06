/**
 * The year type.
 */
export type Year = number
/**
 * The month index type where January is 0.
 */
export type MonthIndex = number
/**
 * The day of the week type where 0 is Sunday.
 */
export type Weekday = number
/**
 * The day of the month type.
 */
export type Day = number
/**
 * The hour of the day type.
 */
export type Hours = number
/**
 * The minute of the hour type.
 */
export type Minutes = number
/**
 * The second of the minute type.
 */
export type Seconds = number
/**
 * The millisecond of the second type.
 */
export type Milliseconds = number
/**
 * The parts of a date as a tuple.
 */
export type DateParts = [
  Year,
  MonthIndex,
  Day,
  Hours,
  Minutes,
  Seconds,
  Milliseconds
]
