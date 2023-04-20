import {
  IANATimezone,
  areInSameQuarter,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('areInSameQuarter', () => {
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
      it('should be true', () => {
        expect(
          areInSameQuarter(tz.makeDate(2000, 0, 1), tz.makeDate(2000, 2, 1), tz)
        ).toBeTruthy()

        expect(
          areInSameQuarter(tz.makeDate(2000, 3, 1), tz.makeDate(2000, 3, 1), tz)
        ).toBeTruthy()

        expect(
          areInSameQuarter(tz.makeDate(2000, 6, 1), tz.makeDate(2000, 8, 1), tz)
        ).toBeTruthy()

        expect(
          areInSameQuarter(
            tz.makeDate(2000, 9, 1),
            tz.makeDate(2000, 11, 1),
            tz
          )
        ).toBeTruthy()

        expect(
          areInSameQuarter(tz.makeDate(2000, 0, 1), tz.makeDate(2001, 1, 1), tz)
        ).toBeTruthy()
      })

      it('should be false', () => {
        expect(
          areInSameQuarter(tz.makeDate(2000, 0, 1), tz.makeDate(2000, 3, 1), tz)
        ).toBeFalsy()

        expect(
          areInSameQuarter(tz.makeDate(2000, 0, 1), tz.makeDate(2001, 3, 1), tz)
        ).toBeFalsy()
      })
    })
  }
})
