import { tzLocal } from './localTimezone'
import { startOfYear } from './startOfYear'
import { Timezone } from './timezone'

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
