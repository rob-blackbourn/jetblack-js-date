import {
  IANATimezone,
  dataToTimezoneOffset,
  startOfWeekYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfWeekYear', () => {
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
      it('returns the date with the time set to 00:00:00 and the date set to the first day of a week year', () => {
        const date = tz.makeDate(2005, 6, 2)
        const actual = startOfWeekYear(date, tz)
        const expected = tz.makeDate(2004, 11, 26)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('for Jan 2 2005', () => {
        const date = tz.makeDate(2005, 0, 2)
        const actual = startOfWeekYear(date, tz)
        const expected = tz.makeDate(2004, 11, 26)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
