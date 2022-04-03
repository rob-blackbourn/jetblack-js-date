import { startOfDay } from './startOfDay'
import { Timezone, tzLocal } from './timezone'

/**
 * Find the start of today.
 *
 * @param tz An optional timezone.
 * @returns The start of today.
 */
export function startOfToday(tz: Timezone = tzLocal): Date {
  return startOfDay(new Date(), tz)
}
