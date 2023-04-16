import { MILLISECONDS_IN_MINUTE } from './constants'

/**
 * Find the start of the minute.
 *
 * @category Anchors
 *
 * @param date The date.
 * @returns The start of the minute.
 */
export function startOfMinute(date: Date): Date {
  return new Date(
    Math.trunc(date.getTime() / MILLISECONDS_IN_MINUTE) * MILLISECONDS_IN_MINUTE
  )
}
