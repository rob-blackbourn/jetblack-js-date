import {
  IANATimezone,
  dataToTimezoneOffset,
  startOfISOWeek,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

describe('startOfISOWeek', () => {
  describe('tzUtc', () => {
    it('returns the date with the time set to 00:00:00 and the date set to the first day of a week', () => {
      const date = tzUtc.makeDate(2014, 8, 2, 2, 11, 55)
      const actual = startOfISOWeek(date, tzUtc)
      const expected = tzUtc.makeDate(2014, 8, 1)
      expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
    })

    it('for Jan 2 2005', () => {
      const date = tzUtc.makeDate(2005, 0, 2)
      const actual = startOfISOWeek(date, tzUtc)
      const expected = tzUtc.makeDate(2004, 11, 27)
      expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
    })
  })

  describe('tzChicago', () => {
    const tzChicago = new IANATimezone(
      'America/Chicago',
      chicagoTzData.map(dataToTimezoneOffset)
    )

    it('should handle Winter', () => {
      const date = tzChicago.makeDate(2000, 0, 1)
      const actual = startOfISOWeek(date, tzChicago)
      const expected = '1999-12-27T00:00:00-06:00'
      expect(tzChicago.toISOString(actual)).toBe(expected)
    })

    it('should handle summer', () => {
      const date = tzChicago.makeDate(2000, 6, 1)
      const actual = startOfISOWeek(date, tzChicago)
      const expected = '2000-06-26T00:00:00-05:00'
      expect(tzChicago.toISOString(actual)).toBe(expected)
    })
  })
})
