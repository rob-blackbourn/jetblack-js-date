import {
  IANATimezone,
  dataToTimezoneOffset,
  weekYear,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('weekYear', () => {
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
      it('returns the local week-numbering year of the given date', () => {
        const date = tz.makeDate(2004, 11, 26)
        const result = weekYear(date, tz)
        expect(result).toBe(2005)
      })
    })
  }
})
