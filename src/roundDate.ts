import { addDays } from './addDays'
import { tzLocal } from './LocalTimezone'
import { startOfDay } from './startOfDay'
import { Timezone } from './Timezone'

/**
 * Round a date to the start of the current day if before noon;
 * otherwise the start of the next day.
 *
 * @param date The date to round
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the day of the rounded date.
 */
export function roundDate(date: Date, tz: Timezone = tzLocal): Date {
  return tz.hours(date) < 12
    ? startOfDay(date, tz)
    : startOfDay(addDays(date, 1, tz), tz)
}
