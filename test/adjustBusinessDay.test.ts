import {
  BusinessDayConvention,
  HolidayCalendar,
  IANATimezone,
  adjustBusinessDay,
  dataToTimezoneOffset,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('adjustBusinessDay', () => {
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
      const cal = new HolidayCalendar(
        'test',
        [6, 0],
        [
          tz.makeDate(2015, 0, 1),
          tz.makeDate(2015, 3, 3),
          tz.makeDate(2015, 3, 6),
          tz.makeDate(2015, 4, 1),
          tz.makeDate(2015, 11, 25),
          tz.makeDate(2015, 11, 16)
        ],
        tz
      )

      const decThirtyFirst = tz.makeDate(2014, 11, 31)
      const janFirst = tz.makeDate(2015, 0, 1)
      const janSecond = tz.makeDate(2015, 0, 2)

      it('should not require adjustment', () => {
        const date = adjustBusinessDay(
          janFirst,
          BusinessDayConvention.NONE,
          true,
          cal,
          tz
        )
        expect(date.toISOString()).toBe(janFirst.toISOString())
      })

      it('should adjust following', () => {
        const date = adjustBusinessDay(
          janFirst,
          BusinessDayConvention.FOLLOWING,
          true,
          cal,
          tz
        )
        expect(date.toISOString()).toBe(janSecond.toISOString())
      })

      it('should adjust preceding', () => {
        const date = adjustBusinessDay(
          janFirst,
          BusinessDayConvention.PRECEDING,
          true,
          cal,
          tz
        )
        expect(date.toISOString()).toBe(decThirtyFirst.toISOString())
      })
    })
  }
})
