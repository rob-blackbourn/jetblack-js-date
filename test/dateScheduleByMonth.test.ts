import {
  IANATimezone,
  dataToTimezoneOffset,
  dateScheduleByMonth,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dateScheduleByMonth', () => {
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
      it('should create a month range', () => {
        const actual = dateScheduleByMonth(tz.makeDate(2000, 0, 1), 0, 6, 1, tz)
        const expected = [
          tz.makeDate(2000, 0, 1),
          tz.makeDate(2000, 1, 1),
          tz.makeDate(2000, 2, 1),
          tz.makeDate(2000, 3, 1),
          tz.makeDate(2000, 4, 1),
          tz.makeDate(2000, 5, 1)
        ]
        actual.forEach((value, index) =>
          expect(tz.toISOString(value)).toBe(tz.toISOString(expected[index]))
        )
      })
    })
  }
})
