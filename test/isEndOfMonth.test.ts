import {
  IANATimezone,
  dataToTimezoneOffset,
  isEndOfMonth,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('isEndOfMonth', () => {
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
      it('should know 30 January is not the end of the month', () => {
        const date = tz.makeDate(2008, 0, 30)
        expect(isEndOfMonth(date, tz)).toBeFalsy()
      })

      it('should know 31 January is not the end of the month', () => {
        const date = tz.makeDate(2008, 0, 31)
        expect(isEndOfMonth(date, tz)).toBeTruthy()
      })

      it('should know 28 February 2008 is not the end of the month because 2008 is a leap year', () => {
        const date = tz.makeDate(2008, 1, 28)
        expect(isEndOfMonth(date, tz)).toBeFalsy()
      })

      it('should know 29 February 2008 is the end of the month because 2008 is a leap year', () => {
        const date = tz.makeDate(2008, 1, 29)
        expect(isEndOfMonth(date, tz)).toBeTruthy()
      })

      it('should know 28 February 2009 is the end of the month because 2008 is not a leap year', () => {
        const date = tz.makeDate(2009, 1, 28)
        expect(isEndOfMonth(date, tz)).toBeTruthy()
      })
    })
  }
})
