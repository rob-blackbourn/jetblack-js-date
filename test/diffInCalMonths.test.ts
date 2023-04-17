import {
  diffInCalMonths,
  tzLocal,
  tzUtc,
  IANATimezone,
  dataToTimezoneOffset
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

describe('diffInCalMonths', () => {
  describe('utc', () => {
    it('first date later', () => {
      const actual = diffInCalMonths(
        tzUtc.makeDate(2000, 5, 2),
        tzUtc.makeDate(1999, 11, 2),
        tzUtc
      )
      const expected = 6
      expect(actual).toBe(expected)
    })

    it('first date earlier', () => {
      const actual = diffInCalMonths(
        tzUtc.makeDate(1999, 11, 2),
        tzUtc.makeDate(2000, 5, 2),
        tzUtc
      )
      const expected = -6
      expect(actual).toBe(expected)
    })

    it('more than a year', () => {
      const actual = diffInCalMonths(
        tzUtc.makeDate(2002, 5, 2),
        tzUtc.makeDate(2000, 11, 2),
        tzUtc
      )
      const expected = 18
      expect(actual).toBe(expected)
    })

    it('over a year', () => {
      const actual = diffInCalMonths(
        tzUtc.makeDate(2001, 0, 1),
        tzUtc.makeDate(2000, 11, 1),
        tzUtc
      )
      const expected = 1
      expect(actual).toBe(expected)
    })

    it('just days', () => {
      const actual = diffInCalMonths(
        tzUtc.makeDate(2000, 1, 9),
        tzUtc.makeDate(2000, 0, 10),
        tzUtc
      )
      const expected = 0
      expect(actual).toBe(expected)
    })
  })

  describe('local', () => {
    it('first date later', () => {
      const actual = diffInCalMonths(
        tzLocal.makeDate(2000, 5, 2),
        tzLocal.makeDate(1999, 11, 2),
        tzLocal
      )
      const expected = 6
      expect(actual).toBe(expected)
    })

    it('first date earlier', () => {
      const actual = diffInCalMonths(
        tzLocal.makeDate(1999, 11, 2),
        tzLocal.makeDate(2000, 5, 2),
        tzLocal
      )
      const expected = -6
      expect(actual).toBe(expected)
    })

    it('more than a year', () => {
      const actual = diffInCalMonths(
        tzLocal.makeDate(2002, 5, 2),
        tzLocal.makeDate(2000, 11, 2),
        tzLocal
      )
      const expected = 18
      expect(actual).toBe(expected)
    })

    it('over a year', () => {
      const actual = diffInCalMonths(
        tzLocal.makeDate(2001, 0, 1),
        tzLocal.makeDate(2000, 11, 1),
        tzLocal
      )
      const expected = 1
      expect(actual).toBe(expected)
    })

    it('just days', () => {
      const actual = diffInCalMonths(
        tzLocal.makeDate(2000, 1, 9),
        tzLocal.makeDate(2000, 0, 10),
        tzLocal
      )
      const expected = 0
      expect(actual).toBe(expected)
    })
  })

  describe('America/Chicago', () => {
    const tzChicago = new IANATimezone(
      'America/Chicago',
      chicagoTzData.map(dataToTimezoneOffset)
    )

    it('should difference dates', () => {
      const actual = diffInCalMonths(
        tzChicago.makeDate(2000, 5, 1),
        tzChicago.makeDate(2000, 0, 1),
        tzChicago
      )
      const expected = 5
      expect(actual).toBe(expected)
    })

    it('first date later', () => {
      const actual = diffInCalMonths(
        tzChicago.makeDate(2000, 5, 2),
        tzChicago.makeDate(1999, 11, 2),
        tzChicago
      )
      const expected = 6
      expect(actual).toBe(expected)
    })

    it('first date earlier', () => {
      const actual = diffInCalMonths(
        tzChicago.makeDate(1999, 11, 2),
        tzChicago.makeDate(2000, 5, 2),
        tzChicago
      )
      const expected = -6
      expect(actual).toBe(expected)
    })

    it('more than a year', () => {
      const actual = diffInCalMonths(
        tzChicago.makeDate(2002, 5, 2),
        tzChicago.makeDate(2000, 11, 2),
        tzChicago
      )
      const expected = 18
      expect(actual).toBe(expected)
    })

    it('over a year', () => {
      const actual = diffInCalMonths(
        tzChicago.makeDate(2001, 0, 1),
        tzChicago.makeDate(2000, 11, 1),
        tzChicago
      )
      const expected = 1
      expect(actual).toBe(expected)
    })

    it('just days', () => {
      const actual = diffInCalMonths(
        tzChicago.makeDate(2000, 1, 9),
        tzChicago.makeDate(2000, 0, 10),
        tzChicago
      )
      const expected = 0
      expect(actual).toBe(expected)
    })
  })
})
