/**
 * Check if a value is a valid date.
 *
 * ```js
 * > const value = new Date("foo")
 * > console.log(isValidDate(value))
 * false
 * ```
 * @param value The value to check.
 * @returns True if the value is a valid date.
 */
export function isValidDate(value: any): boolean {
  return value instanceof Date && !Number.isNaN(value.valueOf())
}
