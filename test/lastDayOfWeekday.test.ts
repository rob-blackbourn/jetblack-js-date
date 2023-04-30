import {
  IANATimezone,
  dataToTimezoneOffset,
  lastDayOfWeekday,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('lastDayOfWeekday', () => {
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
      it('should find the last moment of the week from Monday', () => {
        const date = tz.makeDate(2022, 6, 4) // Mon 4 July 2022
        const actual = lastDayOfWeekday(date, 1, tz)
        const expected = tz.makeDate(2022, 6, 10)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should find the last moment of the week from Wednesday', () => {
        const date = tz.makeDate(2022, 6, 6) // Wed 6 July 2022
        const actual = lastDayOfWeekday(date, 1, tz)
        const expected = tz.makeDate(2022, 6, 10)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should find the last moment of the week from Sunday', () => {
        const date = tz.makeDate(2022, 6, 10)
        const actual = lastDayOfWeekday(date, 1, tz)
        const expected = tz.makeDate(2022, 6, 10)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
