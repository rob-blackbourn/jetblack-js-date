import { endOfDay } from './endOfDay'
import { Timezone, tzLocal } from './timezone'

/**
 * The end of today.
 *
 * @param tz An optional timezone. Defaults to tzLocal.
 * @returns The end of the current day.
 */
export function endOfToday(tz: Timezone = tzLocal): Date {
  return endOfDay(new Date(), tz)
}
