import {
  IANATimezone,
  dataToTimezoneOffset,
  isoWeekDate,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('isoWeekDate', () => {
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
      it('should handle contemporary dates', () => {
        const samples = [
          { date: tz.makeDate(1977, 0, 1), expected: [1976, 53, 6] },
          { date: tz.makeDate(1977, 0, 2), expected: [1976, 53, 7] },
          { date: tz.makeDate(1977, 11, 31), expected: [1977, 52, 6] },
          { date: tz.makeDate(1978, 0, 1), expected: [1977, 52, 7] },
          { date: tz.makeDate(1978, 0, 2), expected: [1978, 1, 1] },
          { date: tz.makeDate(1978, 11, 31), expected: [1978, 52, 7] },
          { date: tz.makeDate(1979, 0, 1), expected: [1979, 1, 1] },
          { date: tz.makeDate(1979, 11, 30), expected: [1979, 52, 7] },
          { date: tz.makeDate(1979, 11, 31), expected: [1980, 1, 1] },
          { date: tz.makeDate(1980, 0, 1), expected: [1980, 1, 2] },
          { date: tz.makeDate(1980, 11, 28), expected: [1980, 52, 7] },
          { date: tz.makeDate(1980, 11, 29), expected: [1981, 1, 1] },
          { date: tz.makeDate(1980, 11, 30), expected: [1981, 1, 2] },
          { date: tz.makeDate(1980, 11, 31), expected: [1981, 1, 3] },
          { date: tz.makeDate(1981, 0, 1), expected: [1981, 1, 4] },
          { date: tz.makeDate(1981, 11, 31), expected: [1981, 53, 4] },
          { date: tz.makeDate(1982, 0, 1), expected: [1981, 53, 5] },
          { date: tz.makeDate(1982, 0, 2), expected: [1981, 53, 6] },
          { date: tz.makeDate(1982, 0, 3), expected: [1981, 53, 7] }
        ]
        samples.forEach(({ date, expected }) => {
          expect(isoWeekDate(date, tz)).toStrictEqual(expected)
        })
      })
    })
  }
})
