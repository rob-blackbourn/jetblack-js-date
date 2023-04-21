import {
  IANATimezone,
  addNthDayOfWeek,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

/*
     June 2015
Su Mo Tu We Th Fr Sa
    1  2  3  4  5  6
 7  8  9 10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29 30
*/

describe('addNthDayOfWeek', () => {
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
      it('should not change as the first Monday is the same date', () => {
        const actual = addNthDayOfWeek(
          tz.makeDate(2015, 5, 1), // Monday 1st June 2015
          1, // 1st Monday
          1, // Monday
          false, // Don't require the returned date to be different.
          tz
        )
        const expected = tz.makeDate(2015, 5, 1)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should go to the next week when strictly different', () => {
        const actual = addNthDayOfWeek(
          tz.makeDate(2015, 5, 1), // Monday 1st June 2015
          1, // 1st Monday
          1, // Monday
          true, // Require the returned date to be different.
          tz
        )
        const expected = tz.makeDate(2015, 5, 8)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should choose the first Tuesday as the next date', () => {
        const actual = addNthDayOfWeek(
          tz.makeDate(2015, 5, 1), // Monday 1st June 2015
          1, // 1st Tuesday
          2, // Tuesday
          false, // Don't require the returned date to be different.
          tz
        )
        const expected = tz.makeDate(2015, 5, 2)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should choose the first Tuesday as the next date regardless of strict difference', () => {
        const actual = addNthDayOfWeek(
          tz.makeDate(2015, 5, 1), // Monday 1st June 2015
          1, // 1st Tuesday
          2, // Tuesday
          true, // Require the returned date to be different.
          tz
        )
        const expected = tz.makeDate(2015, 5, 2)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should choose the third Wednesday', () => {
        const actual = addNthDayOfWeek(
          tz.makeDate(2015, 5, 1), // Monday 1st June 2015
          3, // third
          3, // Wednesday
          true, // Require the returned date to be different.
          tz
        )
        const expected = tz.makeDate(2015, 5, 17)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should not change as the last Tuesday is the same date', () => {
        const actual = addNthDayOfWeek(
          tz.makeDate(2015, 5, 30), // Monday 1st June 2015
          -1, // back one
          2, // Tuesday
          false, // Don't require the returned date to be different.
          tz
        )
        const expected = tz.makeDate(2015, 5, 30)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should find the third Wednesday from the end of the month', () => {
        const actual = addNthDayOfWeek(
          tz.makeDate(2015, 5, 30), // Monday 1st June 2015
          -3, // back three
          3, // Wednesday
          true, // Require the returned date to be different.
          tz
        )
        const expected = tz.makeDate(2015, 5, 10)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
