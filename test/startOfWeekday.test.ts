import {
  IANATimezone,
  dataToTimezoneOffset,
  startOfWeekday,
  tzLocal,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

describe('startOfWeekday', () => {
  const tzChicago = new IANATimezone(
    'America/Chicago',
    chicagoTzData.map(dataToTimezoneOffset)
  )

  for (const tz of [tzUtc, tzLocal, tzChicago]) {
    describe(tz.name, () => {
      it('Should find Sunday from Tuesday September 2 2014 at 02:11:55 with Sunday as start of week', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55)
        const actual = startOfWeekday(date, 0, tz)
        const expected = tz.makeDate(2014, 7, 31)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('Should find Monday from Tuesday September 2 2014 at 02:11:55 with Monday as start of week', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55)
        const actual = startOfWeekday(date, 1, tz)
        const expected = tz.makeDate(2014, 8, 1)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('Should find Tuesday from Tuesday September 2 2014 at 02:11:55 with Tuesday as start of week', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55)
        const actual = startOfWeekday(date, 2, tz)
        const expected = tz.makeDate(2014, 8, 2)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('Should find Wednesday from Tuesday September 2 2014 at 02:11:55 with Wednesday as start of week', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55)
        const actual = startOfWeekday(date, 3, tz)
        const expected = tz.makeDate(2014, 7, 27)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('Should find Thursday from Tuesday September 2 2014 at 02:11:55 with Thursday as start of week', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55)
        const actual = startOfWeekday(date, 4, tz)
        const expected = tz.makeDate(2014, 7, 28)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('Should find Friday from Tuesday September 2 2014 at 02:11:55 with Friday as start of week', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55)
        const actual = startOfWeekday(date, 5, tz)
        const expected = tz.makeDate(2014, 7, 29)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })

      it('Should find Saturday from Tuesday September 2 2014 at 02:11:55 with Saturday as start of week', () => {
        const date = tz.makeDate(2014, 8, 2, 2, 11, 55)
        const actual = startOfWeekday(date, 6, tz)
        const expected = tz.makeDate(2014, 7, 30)
        expect(tz.toISOString(actual)).toBe(tz.toISOString(expected))
      })
    })
  }
})
