import { Timezone, tzLocal } from './timezone'

/**
 * Add years to a date (or subtract if negative).
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
