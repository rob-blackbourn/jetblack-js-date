import {
  IANATimezone,
  dataToTimezoneOffset,
  startOfDay,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('startOfDay', () => {
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
      it('should return the start of the day', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55, 664)
        const actual = startOfDay(date, tz)
        const expected = tz.makeDate(2014, 8, 2)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should not change date', () => {
        const date = tz.makeDate(2014, 8, 2)
        const actual = startOfDay(date, tz)
        const expected = tz.makeDate(2014, 8, 2)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
