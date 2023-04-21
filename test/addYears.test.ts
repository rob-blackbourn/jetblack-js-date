import {
  IANATimezone,
  addYears,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addYears', () => {
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
      describe('basic', () => {
        it('should add years', () => {
          const date = tz.makeDate(2000, 0, 1)
          const actual = addYears(date, 5, tz)
          const expected = tz.makeDate(2005, 0, 1)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should subtract years', () => {
          const date = tz.makeDate(2000, 0, 1)
          const actual = addYears(date, -5, tz)
          const expected = tz.makeDate(1995, 0, 1)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })
      })

      describe('edge cases', () => {
        it('should not years', () => {
          const date = tz.makeDate(2000, 0, 1)
          const actual = addYears(date, 0, tz)
          const expected = tz.makeDate(2000, 0, 1)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })
      })
    })
  }
})
