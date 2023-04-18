import { IANATimezone, dataToTimezoneOffset, startOfWeek, tzUtc } from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

describe('startOfWeek', () => {
  describe('tzUtc', () => {
    it('returns the date with the time set to 00:00:00 and the date set to the first day of a week', () => {
      const date = new Date('2014-09-02T02:11:55Z')
      const actual = startOfWeek(date, tzUtc)
      const expected = new Date('2014-08-31T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('for Jan 2 2005', () => {
      const date = new Date('2005-01-02T00:00:00Z')
      const actual = startOfWeek(date, tzUtc)
      const expected = new Date('2005-01-02T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })

  describe('tzChicago', () => {
    const tzChicago = new IANATimezone(
      'America/Chicago',
      chicagoTzData.map(dataToTimezoneOffset)
    )

    it('should handle Winter', () => {
      const date = tzChicago.makeDate(2000, 0, 1)
      const actual = startOfWeek(date, tzChicago)
      const expected = '1999-12-26T00:00:00-06:00'
      expect(tzChicago.toISOString(actual)).toBe(expected)
    })

    it('should handle summer', () => {
      const date = tzChicago.makeDate(2000, 6, 1)
      const actual = startOfWeek(date, tzChicago)
      const expected = '2000-06-25T00:00:00-05:00'
      expect(tzChicago.toISOString(actual)).toBe(expected)
    })
  })
})
