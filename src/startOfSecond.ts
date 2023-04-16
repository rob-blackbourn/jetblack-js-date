import { MILLISECONDS_IN_SECOND } from './constants'

/**
 * Find the start of the second.
 *
 * @category Anchors
 *
 * @param date The date.
 * @returns The start of the second.
 */
export function startOfSecond(date: Date): Date {
  return new Date(
    Math.trunc(date.getTime() / MILLISECONDS_IN_SECOND) * MILLISECONDS_IN_SECOND
  )
}
