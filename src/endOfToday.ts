import { endOfDay } from './endOfDay'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'

/**
 * The end of today.
 *
 * @category Anchors
 *
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The end of the current day.
 */
export function endOfToday(tz: Timezone = tzLocal): Date {
  return endOfDay(new Date(), tz)
}
