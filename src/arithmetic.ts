import { Duration } from './duration'
import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'

/**
 * Add years to a date (or subtract if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfYears The number of years to add (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of years.
 */
export function addYears(
  date: Date,
  numberOfYears: number,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year + numberOfYears,
    monthIndex,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}

/**
 * Add months to a date (or subtract if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfMonths The number of months to add (or subtract if negative)
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of months.
 */
export function addMonths(
  date: Date,
  numberOfMonths: number,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex + numberOfMonths,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}

/**
 * Add days to a date (or subtract if negative)
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfDays The number of days to add (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of days.
 */
export function addDays(
  date: Date,
  numberOfDays: number,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex,
    day + numberOfDays,
    hours,
    minutes,
    seconds,
    milliseconds
  )
}

/**
 * Add hours to a date (or subtract if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfHours The number of hours to add (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of hours.
 */
export function addHours(
  date: Date,
  numberOfHours: number,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex,
    day,
    hours + numberOfHours,
    minutes,
    seconds,
    milliseconds
  )
}

/**
 * Adds minutes to a date (or subtracts if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfMinutes The number of minutes to ad (or subtract if negative).
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of minutes.
 */
export function addMinutes(
  date: Date,
  numberOfMinutes: number,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex,
    day,
    hours,
    minutes + numberOfMinutes,
    seconds,
    milliseconds
  )
}

/**
 * Adds seconds to a date (or subtracts if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfSeconds The number of seconds to add.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of seconds.
 */
export function addSeconds(
  date: Date,
  numberOfSeconds: number,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex,
    day,
    hours,
    minutes,
    seconds + numberOfSeconds,
    milliseconds
  )
}

/**
 * Adds milliseconds to a date (or subtracts if negative).
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param numberOfMilliseconds The number of milliseconds to add (or subtract if negative).
 * @param tz An Optional timezone. Defaults to the local timezone.
 * @returns A new date adjusted by the number of milliseconds.
 */
export function addMilliseconds(
  date: Date,
  numberOfMilliseconds: number,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year,
    monthIndex,
    day,
    hours,
    minutes,
    seconds,
    milliseconds + numberOfMilliseconds
  )
}

/**
 * Add or subtract a number of different days of the week.
 *
 * If the start date lies on the specified day of the week and the strictly
 * different flag is false, the current date would be considered the first
 * day of the week.
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param nth The number of week days.
 * @param dow The day of the week where Sunday is 0.
 * @param strictlyDifferent When true the returned date must be different to the start date.
 * @returns The nth week day.
 */
export function addNthDayOfWeek(
  date: Date,
  nth: number,
  dow: number,
  strictlyDifferent: boolean,
  tz: Timezone = tzLocal
): Date {
  if (nth === 0) {
    return date
  }

  if (dow < 0 || dow > 6) {
    throw new RangeError('0 <= dow <= 6')
  }

  let diff = dow - tz.weekDay(date)

  if (diff == 0 && strictlyDifferent) {
    nth += nth >= 0 ? 1 : -1
  }

  if (nth > 0) {
    // If diff = 0 below, the input date is the 1st DOW already, no adjustment
    // is required. The 'diff' is the adjustment from the input date
    // required to get to the first DOW matching the 'dow_index' given.

    if (diff < 0) {
      diff += 7
    }

    const adjustedStartDate = addDays(date, diff, tz)
    const endDate = addDays(adjustedStartDate, (nth - 1) * 7, tz)
    return endDate
  } else {
    // If diff = 0 below, the input date is the 1st DOW already, no adjustment
    // is required. The 'diff' is the adjustment from the input date
    // required to get to the first DOW matching the 'dow_index' given.

    if (diff > 0) {
      diff -= 7
    }

    const adjustedStartDate = addDays(date, diff, tz)
    const endDate = addDays(adjustedStartDate, (nth + 1) * 7, tz)
    return endDate
  }
}

/**
 * Add a duration to a date.
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param duration The duration to add.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns A new date adjusted by adding the duration.
 */
export function addDuration(
  date: Date,
  duration: Duration,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year + duration.years,
    monthIndex + duration.months,
    day + (duration.days + duration.weeks * 7),
    hours + duration.hours,
    minutes + duration.minutes,
    seconds + duration.seconds,
    milliseconds
  )
}

/**
 * Subtract a duration from a date.
 *
 * @category Arithmetic
 *
 * @param date The start date.
 * @param duration The duration to subtract.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns A new date adjusted by subtracting the duration.
 */
export function subDuration(
  date: Date,
  duration: Duration,
  tz: Timezone = tzLocal
): Date {
  const [
    year,
    monthIndex,
    _weekDay,
    day,
    hours,
    minutes,
    seconds,
    milliseconds
  ] = tz.dateParts(date)

  return tz.makeDate(
    year - duration.years,
    monthIndex - duration.months,
    day - (duration.days + duration.weeks * 7),
    hours - duration.hours,
    minutes - duration.minutes,
    seconds - duration.seconds,
    milliseconds
  )
}
