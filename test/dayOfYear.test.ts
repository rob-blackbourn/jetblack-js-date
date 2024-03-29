import {
  IANATimezone,
  dataToTimezoneOffset,
  dayOfYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('dayOfYear', () => {
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
      describe('tzUtc', () => {
        it('returns the local week of year of the given date', () => {
          const date = tz.makeDate(2000, 4, 1)
          const result = dayOfYear(date, tz)
          expect(result).toBe(122)
        })
      })
    })
  }
})
