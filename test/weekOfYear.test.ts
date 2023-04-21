import {
  IANATimezone,
  dataToTimezoneOffset,
  weekOfYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('weekOfDate', () => {
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
      it('returns the local week of year for 2-Jan-2005', () => {
        const date = tz.makeDate(2005, 0, 2)
        const result = weekOfYear(date, tz)
        expect(result).toBe(1)
      })

      it('returns the week of year for 1-Jan-2006', () => {
        const date = tz.makeDate(2006, 0, 1)
        const result = weekOfYear(date, tz)
        expect(result).toBe(1)
      })

      it('returns the week of year for 31-Dec-2006', () => {
        const date = tz.makeDate(2006, 11, 31)
        const result = weekOfYear(date, tz)
        expect(result).toBe(53)
      })

      it('returns the week of year for 31-Dec-2015', () => {
        const date = tz.makeDate(2015, 11, 31)
        const result = weekOfYear(date, tz)
        expect(result).toBe(53)
      })
    })
  }
})
