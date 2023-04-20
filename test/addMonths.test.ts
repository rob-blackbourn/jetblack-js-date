import {
  IANATimezone,
  addMonths,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addMonths', () => {
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
      it('should add months', () => {
        const date = tz.makeDate(2000, 0, 1)
        const actual = addMonths(date, 13, tz)
        const expected = tz.makeDate(2001, 1, 1)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should subtract months', () => {
        const date = tz.makeDate(2000, 0, 1)
        const actual = addMonths(date, -13, tz)
        const expected = tz.makeDate(1998, 11, 1)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
