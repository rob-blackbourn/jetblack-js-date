import {
  diffInCalDays,
  tzUtc,
  IANATimezone,
  dataToTimezoneOffset
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

describe('diffInCalDays', () => {
  describe('utc', () => {
    it('should difference dates', () => {
      const actual = diffInCalDays(
        tzUtc.makeDate(2000, 5, 2),
        tzUtc.makeDate(1999, 11, 21),
        tzUtc
      )
      const expected = 164
      expect(actual).toBe(expected)
    })
  })

  describe('America/Chicago', () => {
    const tzChicago = new IANATimezone(
      'America/Chicago',
      chicagoTzData.map(dataToTimezoneOffset)
    )

    it('should difference dates', () => {
      const actual = diffInCalDays(
        tzChicago.makeDate(2000, 5, 2),
        tzChicago.makeDate(2000, 0, 1),
        tzChicago
      )
      const expected = 153
      expect(actual).toBe(expected)
    })
  })
})
