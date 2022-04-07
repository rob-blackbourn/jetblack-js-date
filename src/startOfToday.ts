import { tzLocal } from './LocalTimezone'
import { startOfDay } from './startOfDay'
import { Timezone } from './Timezone'

/**
 * Find the start of today.
 *
 * @category Anchors
 *
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of today.
 */
export function startOfToday(tz: Timezone = tzLocal): Date {
  return startOfDay(new Date(), tz)
}
