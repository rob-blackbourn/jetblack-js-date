import {
  diffInCalYears,
  tzLocal,
  tzUtc,
  IANATimezone,
  dataToTimezoneOffset
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

describe('diffInCalYears', () => {
  describe('utc', () => {
    it('first date later', () => {
      const actual = diffInCalYears(
        tzUtc.makeDate(2008, 5, 1),
        tzUtc.makeDate(2000, 5, 1),
        tzUtc
      )
      const expected = 8
      expect(actual).toBe(expected)
    })

    it('first date earlier', () => {
      const actual = diffInCalYears(
        tzUtc.makeDate(2000, 5, 1),
        tzUtc.makeDate(2008, 5, 1),
        tzUtc
      )
      const expected = -8
      expect(actual).toBe(expected)
    })

    it('more than a year', () => {
      const actual = diffInCalYears(
        tzUtc.makeDate(2008, 5, 1),
        tzUtc.makeDate(2000, 5, 2),
        tzUtc
      )
      const expected = 7
      expect(actual).toBe(expected)
    })
  })

  describe('local', () => {
    it('first date later', () => {
      const actual = diffInCalYears(
        tzLocal.makeDate(2008, 5, 1),
        tzLocal.makeDate(2000, 5, 1),
        tzLocal
      )
      const expected = 8
      expect(actual).toBe(expected)
    })

    it('first date earlier', () => {
      const actual = diffInCalYears(
        tzLocal.makeDate(2000, 5, 1),
        tzLocal.makeDate(2008, 5, 1),
        tzLocal
      )
      const expected = -8
      expect(actual).toBe(expected)
    })

    it('more than a year', () => {
      const actual = diffInCalYears(
        tzLocal.makeDate(2008, 5, 1),
        tzLocal.makeDate(2000, 5, 2),
        tzLocal
      )
      const expected = 7
      expect(actual).toBe(expected)
    })
  })

  describe('America/Chicago', () => {
    const tzChicago = new IANATimezone(
      'America/Chicago',
      chicagoTzData.map(dataToTimezoneOffset)
    )

    it('first date later', () => {
      const actual = diffInCalYears(
        tzChicago.makeDate(2008, 5, 1),
        tzChicago.makeDate(2000, 5, 1),
        tzChicago
      )
      const expected = 8
      expect(actual).toBe(expected)
    })

    it('first date earlier', () => {
      const actual = diffInCalYears(
        tzChicago.makeDate(2000, 5, 1),
        tzChicago.makeDate(2008, 5, 1),
        tzChicago
      )
      const expected = -8
      expect(actual).toBe(expected)
    })

    it('more than a year', () => {
      const actual = diffInCalYears(
        tzChicago.makeDate(2008, 5, 1),
        tzChicago.makeDate(2000, 5, 2),
        tzChicago
      )
      const expected = 7
      expect(actual).toBe(expected)
    })
  })
})
