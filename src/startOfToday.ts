import { tzLocal } from './localTimezone'
import { startOfDay } from './startOfDay'
import { Timezone } from './timezone'

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
