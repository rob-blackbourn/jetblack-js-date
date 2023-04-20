import {
  IANATimezone,
  addDays,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addDays', () => {
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
      it('should add days', () => {
        const date = tz.makeDate(2000, 0, 1)
        const actual = addDays(date, 40, tz)
        const expected = tz.makeDate(2000, 1, 10)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should subtract days', () => {
        const date = tz.makeDate(2000, 0, 1)
        const actual = addDays(date, -40, tz)
        const expected = tz.makeDate(1999, 10, 22)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
