import { tzLocal } from './LocalTimezone'
import { startOfYear } from './startOfYear'
import { Timezone } from './Timezone'

/**
 * Find the start of the current year.
 *
 * @category Anchors
 *
 * @param tz An optional timezone. Defaults to the local timezone.
 * @returns The start of the current year.
 */
export function startOfCurrentYear(tz: Timezone = tzLocal): Date {
  return startOfYear(new Date(), tz)
}
