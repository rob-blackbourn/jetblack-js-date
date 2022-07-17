import { Duration } from './Duration'
import { IANATimezone, TimezoneOffset } from './IANATimezone'

/**
 * A JSON.parse reviver for tzdata.
 *
 * @category Timezone
 *
 * @param key The JSON key.
 * @param value The JSON value.
 * @returns A revived value if applicable.
 */
export function tzDataReviver(key: string, value: any): any {
  if (key === 'utc' || key == 'local') {
    return new Date(value)
  } else if (key === 'offset') {
    const duration = new Duration(value)
    return duration.hours * 60 + duration.minutes
  } else {
    return value
  }
}

/**
 * Transform the values of a timezone offset.
 *
 * @category Timezone
 *
 * @param data The object to transform.
 * @returns The transformed object.
 */
export function dataToTimezoneOffset(data: object): TimezoneOffset {
  return Object.entries(data).reduce(
    (result, [key, value]) => ({ ...result, [key]: tzDataReviver(key, value) }),
    {}
  ) as TimezoneOffset
}

/**
 * Transform the values of a minified timezone offset.
 *
 * @category Timezone
 *
 * @param data The object to transform.
 * @returns The transformed object.
 */
export function minDataToTimezoneOffset(data: {
  u: number
  o: number
  a: string
  d: number
}): TimezoneOffset {
  return {
    utc: data.u,
    offset: data.o,
    abbr: data.a,
    isDst: data.d === 1
  }
}

/**
 * Create a timezone from JSON data.
 *
 * The JSON data requires transformation to convert date and duration strings to
 * objects.
 *
 * @category Timezone
 *
 * @param name The timezone name.
 * @param tzdata The JSON timezone data.
 * @returns The new timezone.
 */
export function timezoneFromJSON(name: string, tzdata: object[]): IANATimezone {
  return new IANATimezone(name, tzdata.map(dataToTimezoneOffset))
}

/**
 * Fetch a timezone.
 *
 * @param name The timezone name.
 * @param version The database version.
 * @param rootUrl The root url.
 * @param options Fetch options
 * @returns A promise resolving to the timezone.
 */
export function fetchTimezone(
  name: string,
  version: string = 'latest',
  rootUrl: string = 'https://cdn.jsdelivr.net/npm/@jetblack/tzdata/dist',
  options?: RequestInit
): Promise<IANATimezone> {
  return new Promise<IANATimezone>((resolve, reject) => {
    fetch(`${rootUrl}/${version}/${name}.min.json`, options)
      .then(response => response.json())
      .then(data => {
        const zoneData = data.map(minDataToTimezoneOffset)
        const tz = new IANATimezone(name, zoneData)
        resolve(tz)
      })
      .catch(reject)
  })
}

/**
 * Fetch a list of timezone names.
 *
 * @param version The database version.
 * @param rootUrl The root url.
 * @param options Fetch options
 * @returns A promise resolving to the list of time zone names.
 */
export function fetchTimezoneNames(
  version: string = 'latest',
  rootUrl: string = 'https://cdn.jsdelivr.net/npm/@jetblack/tzdata/dist',
  options?: RequestInit
): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    fetch(`${rootUrl}/${version}/zones.json`, options)
      .then(response => response.json())
      .then(resolve)
      .catch(reject)
  })
}

export async function loadTimezone(
  name: string,
  version: string = 'latest'
): Promise<IANATimezone> {
  const { default: tzData } = await import(
    `@jetblack/tzdata/dist/${version}/${name}.min.json`
  )
  return new IANATimezone(name, tzData.map(minDataToTimezoneOffset))
}

export async function loadTimezoneNames(
  version: string = 'latest'
): Promise<IANATimezone> {
  const { default: names } = await import(
    `@jetblack/tzdata/dist/${version}/zones.json`
  )
  return names
}
