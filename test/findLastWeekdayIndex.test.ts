import {
  IANATimezone,
  dataToTimezoneOffset,
  findWeekdayIndex,
  findLastWeekdayIndex,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('indices', () => {
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
      describe('weekday', () => {
        it('should find weekday', () => {
          const actual = findWeekdayIndex(
            [
              tz.makeDate(2000, 0, 1),
              tz.makeDate(2000, 0, 2),
              tz.makeDate(2000, 0, 3),
              tz.makeDate(2000, 0, 4),
              tz.makeDate(2000, 0, 5),
              tz.makeDate(2000, 0, 6),
              tz.makeDate(2000, 0, 7),
              tz.makeDate(2000, 0, 8),
              tz.makeDate(2000, 0, 9),
              tz.makeDate(2000, 0, 10),
              tz.makeDate(2000, 0, 11),
              tz.makeDate(2000, 0, 12),
              tz.makeDate(2000, 0, 13),
              tz.makeDate(2000, 0, 14)
            ],
            1, //Monday
            tz
          )
          expect(actual).toBe(2)
        })

        it('should find last weekday', () => {
          const actual = findLastWeekdayIndex(
            [
              tz.makeDate(2000, 0, 1),
              tz.makeDate(2000, 0, 2),
              tz.makeDate(2000, 0, 3),
              tz.makeDate(2000, 0, 4),
              tz.makeDate(2000, 0, 5),
              tz.makeDate(2000, 0, 6),
              tz.makeDate(2000, 0, 7),
              tz.makeDate(2000, 0, 8),
              tz.makeDate(2000, 0, 9),
              tz.makeDate(2000, 0, 10),
              tz.makeDate(2000, 0, 11),
              tz.makeDate(2000, 0, 12),
              tz.makeDate(2000, 0, 13),
              tz.makeDate(2000, 0, 14)
            ],
            1, //Monday
            tz
          )
          expect(actual).toBe(9)
        })

        it('should not find weekday', () => {
          const actual = findWeekdayIndex(
            [tz.makeDate(2000, 0, 1), tz.makeDate(2000, 0, 2)],
            1, //Monday
            tz
          )
          expect(actual).toBe(-1)
        })

        it('should not find last weekday', () => {
          const actual = findLastWeekdayIndex(
            [
              tz.makeDate(2000, 0, 11),
              tz.makeDate(2000, 0, 12),
              tz.makeDate(2000, 0, 13),
              tz.makeDate(2000, 0, 14)
            ],
            1, //Monday
            tz
          )
          expect(actual).toBe(-1)
        })
      })
    })
  }
})
