import { Duration } from './duration'
import { TimezoneDelta } from './timezone'

/**
 * A JSON.parse reviver for tzdata.
 *
 * @param key The JSON key.
 * @param value The JSON value.
 * @returns A revived value if applicable.
 */
export function tzDataReviver(key: string, value: any): any {
  if (key === 'utc' || key == 'local') {
    return new Date(value)
  } else if (key === 'offset') {
    return new Duration(value)
  } else {
    return value
  }
}

/**
 * Transform the values of a timezone delta.
 *
 * @param obj The object to transform.
 * @returns The transformed object.
 */
export function objectToTimezoneDelta(obj: object): TimezoneDelta {
  return Object.entries(obj).reduce(
    (result, [key, value]) => ({ ...result, [key]: tzDataReviver(key, value) }),
    {}
  ) as TimezoneDelta
}
