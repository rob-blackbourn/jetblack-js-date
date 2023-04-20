import {
  IANATimezone,
  dataToTimezoneOffset,
  addBusinessDays,
  HolidayCalendar,
  calWeekends,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('addBusinessDays', () => {
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
      describe('with the default weekend calendar', () => {
        it('should add business days within week', () => {
          // Mon 3 Jan 2000
          const actual = addBusinessDays(
            tz.makeDate(2000, 0, 3),
            1,
            calWeekends,
            tz
          )
          const expected = tz.makeDate(2000, 0, 4)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should subtract business days within week', () => {
          // Tue 4 Jan 2000
          const actual = addBusinessDays(
            tz.makeDate(2000, 0, 4),
            -1,
            calWeekends,
            tz
          )
          const expected = tz.makeDate(2000, 0, 3)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should add business days across a weekend', () => {
          // Fri 7 Jan 2000
          const actual = addBusinessDays(
            tz.makeDate(2000, 0, 7),
            1,
            calWeekends,
            tz
          )
          const expected = tz.makeDate(2000, 0, 10)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should subtract business days across a weekend', () => {
          // Mon 10 Jan 2000
          const actual = addBusinessDays(
            tz.makeDate(2000, 0, 10),
            -1,
            calWeekends,
            tz
          )
          const expected = tz.makeDate(2000, 0, 7)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })
      })

      describe('with custom calendar', () => {
        const cal = new HolidayCalendar(
          'cal',
          [0, 6],
          [
            tz.makeDate(2015, 0, 1),
            tz.makeDate(2015, 3, 3),
            tz.makeDate(2015, 3, 6),
            tz.makeDate(2015, 4, 1),
            tz.makeDate(2015, 11, 25),
            tz.makeDate(2015, 11, 26)
          ]
        )

        it('should add and skip New Years day', () => {
          const date = tz.makeDate(2015, 0, 1)
          const actual = addBusinessDays(date, 5, cal, tz)
          const expected = tz.makeDate(2015, 0, 8)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should add but nothing to skip', () => {
          const date = tz.makeDate(2015, 0, 2)
          const actual = addBusinessDays(date, 4, cal, tz)
          const expected = tz.makeDate(2015, 0, 8)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should add and skip', () => {
          const date = tz.makeDate(2014, 11, 29)
          const actual = addBusinessDays(date, 3, cal, tz)
          const expected = tz.makeDate(2015, 0, 2)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should subtract and skip New Years day', () => {
          const date = tz.makeDate(2015, 0, 8)
          const actual = addBusinessDays(date, -5, cal, tz)
          const expected = tz.makeDate(2014, 11, 31)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should subtract but nothing to skip', () => {
          const date = tz.makeDate(2015, 0, 8)
          const actual = addBusinessDays(date, -4, cal, tz)
          const expected = tz.makeDate(2015, 0, 2)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })

        it('should subtract and skip', () => {
          const date = tz.makeDate(2015, 0, 2)
          const actual = addBusinessDays(date, -2, cal, tz)
          const expected = tz.makeDate(2014, 11, 30)
          expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
        })
      })
    })
  }
})
