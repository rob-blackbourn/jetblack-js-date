import { IANATimezone, objectToTimezoneDelta } from '../src'
import timezones from './timezones.json'

const BRUSSELS_TZNAME = 'Europe/Brussels'
const tzBrussels = new IANATimezone(
  BRUSSELS_TZNAME,
  timezones['Europe/Brussels'].map(objectToTimezoneDelta)
)

describe('timezone', () => {
  describe('basic', () => {
    it('should construct a date', () => {
      const actual = tzBrussels.makeDate(2000, 0, 1)
      const expected = new Date('1999-12-31T23:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should destruct a date', () => {
      const [
        year,
        monthIndex,
        _weekDay,
        day,
        hours,
        minutes,
        seconds,
        milliseconds
      ] = tzBrussels.dateParts(new Date('1999-12-31T23:00:00Z'))
      expect(year).toBe(2000)
      expect(monthIndex).toBe(0)
      expect(day).toBe(1)
      expect(hours).toBe(0)
      expect(minutes).toBe(0)
      expect(seconds).toBe(0)
      expect(milliseconds).toBe(0)
    })

    it('should get the offset', () => {
      const date = tzBrussels.makeDate(2000, 0, 1)
      const actual = tzBrussels.offset(date)
      const expected = 60
      expect(actual).toBe(expected)
    })

    it('should ISO format', () => {
      const date = new Date('2000-01-01T12:00:00Z')
      const actual = tzBrussels.toISOString(date)
      expect(actual).toBe('2000-01-01T13:00:00+01:00')
    })
  })
})
