import { addDays } from './arithmetic'
import { daysInMonth } from './daysInMonth'
import { Timezone, tzLocal } from './timezone'
import { weekYear } from './weekYear'

/**
 * Find the start of the day.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the day.
 */
export function startOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const [year, monthIndex, _weekDay, day] = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, day)
}

/**
 * Find the start of today.
 *
 * @category Anchors
 *
 * @param tz An optional timezone.
 * @returns The start of today.
 */
export function startOfToday(tz: Timezone = tzLocal): Date {
  return startOfDay(new Date(), tz)
}

/**
 * Return the end of the day for the given date.
 *
 * @category Anchors
 *
 * @param date The start date.
 * @param tz An optional timezone. Defaults to otzLocal.
 * @returns A new date which is the end of the day.
 */
export function endOfDay(date: Date, tz: Timezone = tzLocal): Date {
  const [year, monthIndex, _weekDay, day] = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, day, 23, 59, 59, 999)
}

/**
 * The end of today.
 *
 * @category Anchors
 *
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The end of the current day.
 */
export function endOfToday(tz: Timezone = tzLocal): Date {
  return endOfDay(new Date(), tz)
}

/**
 * Find the start of the months for a given date.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the month.
 */
export function startOfMonth(date: Date, tz: Timezone = tzLocal): Date {
  const [year, monthIndex] = tz.dateParts(date)
  return tz.makeDate(year, monthIndex, 1)
}

/**
 * Find the start of the current month.
 *
 * @category Anchors
 *
 * @param tz An optional timezone.
 * @returns The start of the current month.
 */
export function startOfCurrentMonth(tz: Timezone = tzLocal): Date {
  return startOfMonth(new Date(), tz)
}

/**
 * Find the start of the year for a given date.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the year.
 */
export function startOfYear(date: Date, tz: Timezone = tzLocal): Date {
  return tz.makeDate(tz.year(date), 0, 1)
}

/**
 * Find the start of the current year.
 *
 * @category Anchors
 *
 * @param tz An optional timezone.
 * @returns The start of the current year.
 */
export function startOfCurrentYear(tz: Timezone = tzLocal): Date {
  return startOfYear(new Date(), tz)
}

/**
 * Find the start of the week for a given date.
 *
 * @category Anchors
 *
 * @param date A date.
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The start of the week.
 */
export function startOfWeek(date: Date, tz: Timezone = tzLocal): Date {
  const weekDay = tz.weekDay(date)
  return addDays(startOfDay(date, tz), -weekDay, tz)
}

/**
 * Find the first week of the year for a given date.
 *
 * @category Anchors
 *
 * @param date The date.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The date of the first week of the year.
 */
export function startOfWeekYear(date: Date, tz: Timezone = tzLocal): Date {
  const year = weekYear(date, tz)
  const firstWeek = tz.makeDate(year, 0, 1)
  return startOfWeek(firstWeek, tz)
}

/**
 * Calculate the last day of the month.
 *
 * @category Anchors
 *
 * @param year The year.
 * @param monthIndex The month index (where January is 0).
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns A date which is the last day of the month for the given year and month.
 */
export function endOfMonth(
  year: number,
  monthIndex: number,
  tz: Timezone = tzLocal
): Date {
  return tz.makeDate(year, monthIndex, daysInMonth(year, monthIndex))
}
