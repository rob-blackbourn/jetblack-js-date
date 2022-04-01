import { Duration } from './duration'
import { TimezoneDelta } from './timezone'

export function tzDataReviver(key: string, value: any): any {
  if (key === 'utc' || key == 'local') {
    return new Date(value)
  } else if (key === 'offset') {
    return new Duration(value)
  } else {
    return value
  }
}

export function objectToTimezoneDelta(obj: object): TimezoneDelta {
  return Object.entries(obj).reduce(
    (result, [key, value]) => ({ ...result, [key]: tzDataReviver(key, value) }),
    {}
  ) as TimezoneDelta
}
