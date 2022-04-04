import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addYears
} from './arithmetic'
import {
  startOfDay,
  startOfHour,
  startOfMinute,
  startOfSecond
} from './anchors'
import { Timezone, tzLocal } from './timezone'

/**
 * Creates a range of dates by year.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The year step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step years from the start to the end date.
 */
export function yearRange(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfDay(endDate, tz).getTime()
  let date = startOfDay(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addYears(date, step, tz)
  }
  return dates
}

/**
 * Creates a range of dates by month.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The month step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step months from the start to the end date.
 */
export function monthRange(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfDay(endDate, tz).getTime()
  let date = startOfDay(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addMonths(date, step, tz)
  }
  return dates
}

/**
 * Creates a range of dates by day.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The day step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step days from the start to the end date.
 */
export function dayRange(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfDay(endDate, tz).getTime()
  let date = startOfDay(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addDays(date, step, tz)
  }
  return dates
}

/**
 * Creates a range of dates by hours.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The hour step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step hours from the start to the end hour.
 */
export function hourRange(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfHour(endDate, tz).getTime()
  let date = startOfHour(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addHours(date, step, tz)
  }
  return dates
}

/**
 * Creates a range of dates by minutes.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The minute step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step hours from the start to the end minute.
 */
export function minuteRange(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfMinute(endDate, tz).getTime()
  let date = startOfMinute(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addMinutes(date, step, tz)
  }
  return dates
}

/**
 * Creates a range of dates by seconds.
 *
 * @category Ranges
 *
 * @param startDate The start date.
 * @param endDate The end date.
 * @param step The second step count.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The range of dates separated by step hours from the start to the end second.
 */
export function secondRange(
  startDate: Date,
  endDate: Date,
  step: number = 1,
  tz: Timezone = tzLocal
): Date[] {
  const endTime = startOfSecond(endDate, tz).getTime()
  let date = startOfSecond(startDate, tz)
  const dates = []
  while (date.getTime() <= endTime) {
    dates.push(date)
    date = addSeconds(date, step, tz)
  }
  return dates
}
