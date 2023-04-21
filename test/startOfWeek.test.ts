import {
  IANATimezone,
  dataToTimezoneOffset,
  startOfWeek,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfWeek', () => {
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
        const actual = startOfWeek(date, tz)
        const expected = tz.makeDate(2014, 7, 31)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('for Jan 2 2005', () => {
        const date = tz.makeDate(2005, 0, 2)
        const actual = startOfWeek(date, tz)
        const expected = tz.makeDate(2005, 0, 2)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
