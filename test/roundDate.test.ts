import {
  IANATimezone,
  dataToTimezoneOffset,
  roundDate,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('roundDate', () => {
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
      it('should round down', () => {
        const date = tz.makeDate(2020, 0, 1, 11, 59, 59, 999)
        const actual = roundDate(date, tz)
        const expected = tz.makeDate(2020, 0, 1)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should round up', () => {
        const date = tz.makeDate(2020, 0, 1, 12, 0, 0, 0)
        const actual = roundDate(date, tz)
        const expected = tz.makeDate(2020, 0, 2)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should not change', () => {
        const date = tz.makeDate(2020, 0, 1, 0, 0, 0, 0)
        const actual = roundDate(date, tz)
        const expected = tz.makeDate(2020, 0, 1)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
