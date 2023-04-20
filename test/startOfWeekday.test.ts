import {
  IANATimezone,
  dataToTimezoneOffset,
  startOfWeekday,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

describe('startOfWeekday', () => {
  describe('tzUtc', () => {
    it('Should find Sunday from Tuesday September 2 2014 at 02:11:55 with Sunday as start of week', () => {
      const date = tzUtc.makeDate(2014, 8, 2, 2, 11, 55)
      const actual = startOfWeekday(date, 0, tzUtc)
      const expected = tzUtc.makeDate(2014, 7, 31)
      expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
    })

    it('Should find Monday from Tuesday September 2 2014 at 02:11:55 with Monday as start of week', () => {
      const date = tzUtc.makeDate(2014, 8, 2, 2, 11, 55)
      const actual = startOfWeekday(date, 1, tzUtc)
      const expected = tzUtc.makeDate(2014, 8, 1)
      expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
    })

    it('Should find Tuesday from Tuesday September 2 2014 at 02:11:55 with Tuesday as start of week', () => {
      const date = tzUtc.makeDate(2014, 8, 2, 2, 11, 55)
      const actual = startOfWeekday(date, 2, tzUtc)
      const expected = tzUtc.makeDate(2014, 8, 2)
      expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
    })

    it('Should find Wednesday from Tuesday September 2 2014 at 02:11:55 with Wednesday as start of week', () => {
      const date = tzUtc.makeDate(2014, 8, 2, 2, 11, 55)
      const actual = startOfWeekday(date, 3, tzUtc)
      const expected = tzUtc.makeDate(2014, 7, 27)
      expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
    })

    it('Should find Thursday from Tuesday September 2 2014 at 02:11:55 with Thursday as start of week', () => {
      const date = tzUtc.makeDate(2014, 8, 2, 2, 11, 55)
      const actual = startOfWeekday(date, 4, tzUtc)
      const expected = tzUtc.makeDate(2014, 7, 28)
      expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
    })

    it('Should find Friday from Tuesday September 2 2014 at 02:11:55 with Friday as start of week', () => {
      const date = tzUtc.makeDate(2014, 8, 2, 2, 11, 55)
      const actual = startOfWeekday(date, 5, tzUtc)
      const expected = tzUtc.makeDate(2014, 7, 29)
      expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
    })

    it('Should find Saturday from Tuesday September 2 2014 at 02:11:55 with Saturday as start of week', () => {
      const date = tzUtc.makeDate(2014, 8, 2, 2, 11, 55)
      const actual = startOfWeekday(date, 6, tzUtc)
      const expected = tzUtc.makeDate(2014, 7, 30)
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
      const actual = startOfWeekday(date, 0, tzChicago)
      const expected = tzChicago.makeDate(1999, 11, 26)
      expect(tzChicago.toISOString(actual)).toBe(
        tzChicago.toISOString(expected)
      )
    })

    it('should handle summer', () => {
      const date = tzChicago.makeDate(2000, 6, 1)
      const actual = startOfWeekday(date, 0, tzChicago)
      const expected = tzChicago.makeDate(2000, 5, 25)
      expect(tzChicago.toISOString(actual)).toBe(
        tzChicago.toISOString(expected)
      )
    })
  })
})
