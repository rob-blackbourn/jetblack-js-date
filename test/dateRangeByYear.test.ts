import {
  IANATimezone,
  dataToTimezoneOffset,
  dateRangeByYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dateRangeByYear', () => {
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
      it('should create a year range', () => {
        const actual = dateRangeByYear(
          tz.makeDate(2000, 0, 1),
          tz.makeDate(2005, 0, 1),
          1,
          tz
        )
        const expected = [
          tz.makeDate(2000, 0, 1),
          tz.makeDate(2001, 0, 1),
          tz.makeDate(2002, 0, 1),
          tz.makeDate(2003, 0, 1),
          tz.makeDate(2004, 0, 1),
          tz.makeDate(2005, 0, 1)
        ]
        actual.forEach((value, index) =>
          expect(tz.toISOString(value)).toBe(tz.toISOString(expected[index]))
        )
      })
    })
  }
})
