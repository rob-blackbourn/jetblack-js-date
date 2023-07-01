import {
  IANATimezone,
  dataToTimezoneOffset,
  dateScheduleByDay,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dateScheduleByDay', () => {
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
      it('should create a day range', () => {
        const actual = dateScheduleByDay(tz.makeDate(2000, 0, 1), 0, 7, 1, tz)
        const expected = [
          tz.makeDate(2000, 0, 1),
          tz.makeDate(2000, 0, 2),
          tz.makeDate(2000, 0, 3),
          tz.makeDate(2000, 0, 4),
          tz.makeDate(2000, 0, 5),
          tz.makeDate(2000, 0, 6),
          tz.makeDate(2000, 0, 7)
        ]
        actual.forEach((value, index) =>
          expect(tz.toISOString(value)).toBe(tz.toISOString(expected[index]))
        )
      })
    })
  }
})
