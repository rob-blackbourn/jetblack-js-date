import { MILLISECONDS_IN_HOUR } from './constants'

/**
 * Find the start of the hour.
 *
 * @category Anchors
 *
 * @param date The date.
 * @returns The start of the hour.
 */
export function startOfHour(date: Date): Date {
  return new Date(
    Math.trunc(date.getTime() / MILLISECONDS_IN_HOUR) * MILLISECONDS_IN_HOUR
  )
}
