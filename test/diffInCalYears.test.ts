import {
  diffInCalYears,
  tzLocal,
  tzUtc,
  IANATimezone,
  dataToTimezoneOffset
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('diffInCalYears', () => {
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
        const actual = diffInCalYears(
          tz.makeDate(2008, 5, 1),
          tz.makeDate(2000, 5, 1),
          tz
        )
        const expected = 8
        expect(actual).toBe(expected)
      })

      it('first date earlier', () => {
        const actual = diffInCalYears(
          tz.makeDate(2000, 5, 1),
          tz.makeDate(2008, 5, 1),
          tz
        )
        const expected = -8
        expect(actual).toBe(expected)
      })

      it('more than a year', () => {
        const actual = diffInCalYears(
          tz.makeDate(2008, 5, 1),
          tz.makeDate(2000, 5, 2),
          tz
        )
        const expected = 7
        expect(actual).toBe(expected)
      })
    })
  }
})
