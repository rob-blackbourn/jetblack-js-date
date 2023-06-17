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

  it('should handle dates outside those in the database', () => {
    const tz = tzChicago
    const date = tz.makeDate(1900, 0, 1, 12, 0, 0)
    const actual = startOfDay(date, tz)
    const expected = tz.makeDate(1900, 0, 1)
    expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
  })

  // const timezones = [tzUtc, tzLocal, tzChicago, tzTokyo]
  const timezones = [tzChicago]
  for (const tz of timezones) {
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

      it('should handle dates outside those in the database', () => {
        const date = tz.makeDate(1900, 0, 1, 12, 0, 0)
        const actual = startOfDay(date, tz)
        const expected = tz.makeDate(1900, 0, 1)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
