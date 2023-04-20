import {
  diffInCalMonths,
  tzLocal,
  tzUtc,
  IANATimezone,
  dataToTimezoneOffset
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('diffInCalMonths', () => {
  const tzChicago = new IANATimezone(
    'America/Chicago',
    chicagoTzData.map(dataToTimezoneOffset)
  )
  const tzTokyo = new IANATimezone(
    'Asia/Tokyo',
    tokyoTzData.map(dataToTimezoneOffset)
  )

  for (const tz of [tzUtc, tzLocal, tzChicago, tzTokyo]) {
    describe(tz.name, () => {
      it('first date later', () => {
        const actual = diffInCalMonths(
          tz.makeDate(2000, 5, 2),
          tz.makeDate(1999, 11, 2),
          tz
        )
        const expected = 6
        expect(actual).toBe(expected)
      })

      it('first date earlier', () => {
        const actual = diffInCalMonths(
          tz.makeDate(1999, 11, 2),
          tz.makeDate(2000, 5, 2),
          tz
        )
        const expected = -6
        expect(actual).toBe(expected)
      })

      it('more than a year', () => {
        const actual = diffInCalMonths(
          tz.makeDate(2002, 5, 2),
          tz.makeDate(2000, 11, 2),
          tz
        )
        const expected = 18
        expect(actual).toBe(expected)
      })

      it('over a year', () => {
        const actual = diffInCalMonths(
          tz.makeDate(2001, 0, 1),
          tz.makeDate(2000, 11, 1),
          tz
        )
        const expected = 1
        expect(actual).toBe(expected)
      })

      it('just days', () => {
        const actual = diffInCalMonths(
          tz.makeDate(2000, 1, 9),
          tz.makeDate(2000, 0, 10),
          tz
        )
        const expected = 0
        expect(actual).toBe(expected)
      })
    })
  }
})
