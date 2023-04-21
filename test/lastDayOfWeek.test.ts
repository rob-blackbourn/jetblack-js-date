import {
  IANATimezone,
  dataToTimezoneOffset,
  lastDayOfWeek,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('lastDayOfWeek', () => {
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
      it('should find the last moment of the week from Sunday', () => {
        const date = tz.makeDate(2022, 6, 3)
        const actual = lastDayOfWeek(date, tz)
        const expected = tz.makeDate(2022, 6, 9)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should find the last moment of the week from Wednesday', () => {
        const date = tz.makeDate(2022, 6, 6)
        const actual = lastDayOfWeek(date, tz)
        const expected = tz.makeDate(2022, 6, 9)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should find the last moment of the week from Saturday', () => {
        const date = tz.makeDate(2022, 6, 9)
        const actual = lastDayOfWeek(date, tz)
        const expected = tz.makeDate(2022, 6, 9)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
