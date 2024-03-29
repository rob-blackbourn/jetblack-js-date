import {
  IANATimezone,
  dataToTimezoneOffset,
  dateScheduleByWeek,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dateScheduleByWeek', () => {
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
      it('should create a week range', () => {
        const actual = dateScheduleByWeek(tz.makeDate(2000, 0, 3), 0, 5, 1, tz)
        const expected = [
          tz.makeDate(2000, 0, 3),
          tz.makeDate(2000, 0, 10),
          tz.makeDate(2000, 0, 17),
          tz.makeDate(2000, 0, 24),
          tz.makeDate(2000, 0, 31)
        ]
        actual.forEach((value, index) =>
          expect(tz.toISOString(value)).toBe(tz.toISOString(expected[index]))
        )
      })
    })
  }
})
