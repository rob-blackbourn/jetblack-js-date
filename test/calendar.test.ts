import {
  IANATimezone,
  calWeekends,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('calendar', () => {
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
      describe('calWeekends', () => {
        it('should know 19 December 2014 was a Friday', () => {
          const date = tz.makeDate(2014, 11, 19)
          expect(calWeekends.isWeekend(date, tz)).toBeFalsy()
        })

        it('should know 20 December 2014 was a Saturday', () => {
          const date = tz.makeDate(2014, 11, 20)
          expect(calWeekends.isWeekend(date, tz)).toBeTruthy()
        })

        it('should know 21 December 2014 was a Sunday', () => {
          const date = tz.makeDate(2014, 11, 21)
          expect(calWeekends.isWeekend(date, tz)).toBeTruthy()
        })

        it('should know 22 December 2014 was a Monday', () => {
          const date = tz.makeDate(2014, 11, 22)
          expect(calWeekends.isWeekend(date, tz)).toBeFalsy()
        })
      })
    })
  }
})
