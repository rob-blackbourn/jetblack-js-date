import {
  IANATimezone,
  dataToTimezoneOffset,
  dayOfYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

describe('dayOfYear', () => {
  describe('tzUtc', () => {
    it('returns the local week of year of the given date', () => {
      const date = tzUtc.makeDate(2000, 4, 1)
      const result = dayOfYear(date, tzUtc)
      expect(result).toBe(122)
    })
  })

  describe('tzLocal', () => {
    it('returns the local week of year of the given date', () => {
      const date = tzLocal.makeDate(2000, 4, 1)
      const result = dayOfYear(date, tzLocal)
      expect(result).toBe(122)
    })
  })

  describe('tzChicago', () => {
    const tzChicago = new IANATimezone(
      'America/Chicago',
      chicagoTzData.map(dataToTimezoneOffset)
    )

    it('returns the local week of year of the given date', () => {
      const date = tzChicago.makeDate(2000, 4, 1)
      const result = dayOfYear(date, tzChicago)
      expect(result).toBe(122)
    })
  })
})
