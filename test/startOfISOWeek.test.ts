import {
  IANATimezone,
  dataToTimezoneOffset,
  startOfISOWeek,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfISOWeek', () => {
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
      it('returns the date with the time set to 00:00:00 and the date set to the first day of a week', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55)
        const actual = startOfISOWeek(date, tz)
        const expected = tz.makeDate(2014, 8, 1)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('for Jan 2 2005', () => {
        const date = tzUtc.makeDate(2005, 0, 2)
        const actual = startOfISOWeek(date, tzUtc)
        const expected = tzUtc.makeDate(2004, 11, 27)
        expect(tzUtc.toISOString(actual)).toBe(tzUtc.toISOString(expected))
      })

      it('should handle Winter', () => {
        const date = tz.makeDate(2000, 0, 1)
        const actual = startOfISOWeek(date, tz)
        const expected = tz.makeDate(1999, 11, 27)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should handle summer', () => {
        const date = tz.makeDate(2000, 6, 1)
        const actual = startOfISOWeek(date, tz)
        const expected = tz.makeDate(2000, 5, 26)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
