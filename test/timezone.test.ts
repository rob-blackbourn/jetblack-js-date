import { IANATimezone, objectToTimezoneDelta, tzUtc } from '../src'
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

    it('should get the year for an IANA timezone', () => {
      const year = tzBrussels.year(new Date('1999-12-31T23:00:00Z'))
      expect(year).toBe(2000)
    })
    it('should get the month for an IANA timezone', () => {
      const monthIndex = tzBrussels.monthIndex(new Date('1999-12-31T23:00:00Z'))
      expect(monthIndex).toBe(0)
    })
    it('should get the weekday for an IANA timezone', () => {
      const weekday = tzBrussels.weekday(new Date('1999-12-31T23:00:00Z'))
      expect(weekday).toBe(6)
    })
    it('should get the day for an IANA timezone', () => {
      const day = tzBrussels.day(new Date('1999-12-31T23:00:00Z'))
      expect(day).toBe(1)
    })
    it('should get the hours for an IANA timezone', () => {
      const hours = tzBrussels.hours(new Date('1999-12-31T23:00:00Z'))
      expect(hours).toBe(0)
    })
    it('should get the minutes for an IANA timezone', () => {
      const minutes = tzBrussels.minutes(new Date('1999-12-31T23:00:00Z'))
      expect(minutes).toBe(0)
    })
    it('should get the seconds for an IANA timezone', () => {
      const seconds = tzBrussels.seconds(new Date('1999-12-31T23:00:00Z'))
      expect(seconds).toBe(0)
    })
    it('should get the milliseconds for an IANA timezone', () => {
      const milliseconds = tzBrussels.milliseconds(
        new Date('1999-12-31T23:00:00Z')
      )
      expect(milliseconds).toBe(0)
    })

    it('should get the foo for an UTC timezone', () => {
      const year = tzUtc.year(new Date('2000-01-01T00:00:00Z'))
      expect(year).toBe(2000)
    })
    it('should get the month for an UTC timezone', () => {
      const monthIndex = tzUtc.monthIndex(new Date('2000-01-01T00:00:00Z'))
      expect(monthIndex).toBe(0)
    })
    it('should get the weekday for an UTC timezone', () => {
      const weekday = tzUtc.weekday(new Date('2000-01-01T00:00:00Z'))
      expect(weekday).toBe(6)
    })
    it('should get the day for an UTC timezone', () => {
      const day = tzUtc.day(new Date('2000-01-01T00:00:00Z'))
      expect(day).toBe(1)
    })
    it('should get the hours for an UTC timezone', () => {
      const hours = tzUtc.hours(new Date('2000-01-01T00:00:00Z'))
      expect(hours).toBe(0)
    })
    it('should get the minutes for an UTC timezone', () => {
      const minutes = tzUtc.minutes(new Date('2000-01-01T00:00:00Z'))
      expect(minutes).toBe(0)
    })
    it('should get the seconds for an UTC timezone', () => {
      const seconds = tzUtc.seconds(new Date('2000-01-01T00:00:00Z'))
      expect(seconds).toBe(0)
    })
    it('should get the milliseconds for an UTC timezone', () => {
      const milliseconds = tzUtc.milliseconds(new Date('2000-01-01T00:00:00Z'))
      expect(milliseconds).toBe(0)
    })
  })
})
