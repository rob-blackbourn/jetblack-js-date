import {
  IANATimezone,
  dataToTimezoneOffset,
  isLastDayOfQuarter,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('isLastDayOfQuarter', () => {
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
      it('should know 30 January is not the end of the quarter', () => {
        const date = tz.makeDate(2008, 0, 30)
        expect(isLastDayOfQuarter(date, tz)).toBeFalsy()
      })

      it('should know 31 March is the end of the month', () => {
        const date = tz.makeDate(2008, 2, 31)
        expect(isLastDayOfQuarter(date, tz)).toBeTruthy()
      })
    })
  }
})
