import { isEndOfMonth } from './isEndOfMonth'
import { tzLocal } from './localTimezone'
import { Timezone } from './timezone'
import { findLastIndex } from './utils'

/**
 * Find the index of the first date with the given day of the month.
 *
 * @param dates The dates
 * @param day The day of the month to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findDayIndex(
  dates: Date[],
  day: number,
  tz: Timezone = tzLocal
): number {
  return dates.findIndex(date => tz.day(date) === day)
}

/**
 * Find the index of the last date with the given day of the month.
 *
 * @param dates The dates
 * @param day The day of the month to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function findLastDayIndex(
  dates: Date[],
  day: number,
  tz: Timezone = tzLocal
): number {
  return findLastIndex(dates, date => tz.day(date) === day)
}

/**
 * Find the index of the first date with the given weekday.
 *
 * @param dates The dates
 * @param day The weekday to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findWeekdayIndex(
  dates: Date[],
  weekDay: number,
  tz: Timezone = tzLocal
): number {
  return dates.findIndex(date => tz.weekDay(date) === weekDay)
}

/**
 * Find the index of the last date with the given weekday.
 *
 * @param dates The dates
 * @param day The weekday to check
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function lastWeekdayIndex(
  dates: Date[],
  weekDay: number,
  tz: Timezone = tzLocal
): number {
  return findLastIndex(dates, date => tz.weekDay(date) === weekDay)
}

/**
 * Find the index of the first date that is the start of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findStartOfMonthIndex(
  dates: Date[],
  tz: Timezone = tzLocal
): number {
  return findLastDayIndex(dates, 1, tz)
}

/**
 * Find the index of the last date that is the start of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function findLastStartOfMonthIndex(
  dates: Date[],
  tz: Timezone = tzLocal
): number {
  return findLastDayIndex(dates, 1, tz)
}

/**
 * Find the index of the first date that is the end of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the first match, or -1.
 */
export function findEndOfMonthIndex(
  dates: Date[],
  tz: Timezone = tzLocal
): number {
  return dates.findIndex(date => isEndOfMonth(date, tz))
}

/**
 * Find the index of the last date that is the end of the month.
 *
 * @param dates The dates
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The index of the last match, or -1.
 */
export function findLastEndOfMonthIndex(
  dates: Date[],
  tz: Timezone = tzLocal
): number {
  return findLastIndex(dates, date => isEndOfMonth(date))
}
