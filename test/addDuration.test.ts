import {
  Duration,
  IANATimezone,
  addDuration,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addDuration', () => {
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
      it('should add duration', () => {
        const duration = new Duration('P1D')
        const actual = addDuration(tz.makeDate(2000, 0, 1), duration, tz)
        const expected = tz.makeDate(2000, 0, 2)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('should add a negative duration', () => {
        const duration = new Duration('-P1D')
        const actual = addDuration(tz.makeDate(2000, 0, 1), duration, tz)
        const expected = tz.makeDate(1999, 11, 31)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
