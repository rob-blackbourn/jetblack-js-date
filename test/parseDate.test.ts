import {
  IANATimezone,
  dataToTimezoneOffset,
  parseDate,
  tzUtc,
  tzLocal,
  addMinutes
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('parseDate', () => {
  it('should fail to parse leap year date', () => {
    const actual = parseDate('2019-02-29', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should fail to parse month with too many digits', () => {
    const actual = parseDate('2016-1234-12', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should fail to parse zero month', () => {
    const actual = parseDate('2016-00-12', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should fail to parse month out of range', () => {
    const actual = parseDate('2016-31-12', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should fail to parse 13th month', () => {
    const actual = parseDate('2016-13-12', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should fail to parse day with too many digits', () => {
    const actual = parseDate('2016-01-1234', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should fail to parse day with too few digits', () => {
    const actual = parseDate('2016-01-1', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should fail to parse zero day', () => {
    const actual = parseDate('2016-01-00', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should fail to parse day out of range', () => {
    const actual = parseDate('2016-01-32', 'yyyy-mm-dd')
    expect(actual).toBeNull()
  })

  it('should parse ISO date', () => {
    const actual = parseDate('2000-01-01', 'yyyy-mm-dd')
    const expected = tzLocal.makeDate(2000, 0, 1)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse ISO datetime', () => {
    const actual = parseDate(
      '2000-06-01T12:35:59.999',
      'yyyy-mm-dd[T]HH:MM:SS.FFF'
    )
    const expected = tzLocal.makeDate(2000, 5, 1, 12, 35, 59, 999)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse ISO datetime with zulu timezone', () => {
    const actual = parseDate(
      '2000-01-01T12:35:59.999Z',
      'yyyy-mm-dd[T]HH:MM:SS.FFFZ'
    )
    const expected = tzUtc.makeDate(2000, 0, 1, 12, 35, 59, 999)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse ISO datetime with timezone', () => {
    const actual = parseDate(
      '2000-01-01T12:35:59.999+01:00',
      'yyyy-mm-dd[T]HH:MM:SS.FFFZ'
    )
    const expected = addMinutes(
      tzUtc.makeDate(2000, 0, 1, 12, 35, 59, 999),
      -60
    )
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse ISO datetime with timezone no colon', () => {
    const actual = parseDate(
      '2000-01-01T12:35:59.999-0100',
      'yyyy-mm-dd[T]HH:MM:SS.FFFZ'
    )
    const expected = addMinutes(tzUtc.makeDate(2000, 0, 1, 12, 35, 59, 999), 60)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse leap year date', () => {
    const actual = parseDate('2020-02-29', 'yyyy-mm-dd')
    const expected = tzLocal.makeDate(2020, 1, 29)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse yyyy/mm/dd', () => {
    const actual = parseDate('2020/07/12', 'yyyy/mm/dd')
    const expected = tzLocal.makeDate(2020, 6, 12)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse yyyymmdd', () => {
    const actual = parseDate('20200229', 'yyyymmdd')
    const expected = tzLocal.makeDate(2020, 1, 29)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse mm/dd/yy', () => {
    const actual = parseDate('10/01/20', 'mm/dd/yy')
    const expected = tzLocal.makeDate(2020, 9, 1)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse dd/mm/yy', () => {
    const actual = parseDate('31/12/20', 'dd/mm/yy')
    const expected = tzLocal.makeDate(2020, 11, 31)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse d/m/yy', () => {
    const actual = parseDate('12/8/20', 'd/m/yy')
    const expected = tzLocal.makeDate(2020, 7, 12)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse dd-mmm-yy and go forward', () => {
    // If the year would be less than 50 years from this century
    // use this century.
    const year = new Date().getFullYear() + 50
    const actual = parseDate(`1-Jan-${year % 100}`, 'd-mmm-yy')
    const expected = tzLocal.makeDate(year, 0, 1)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse dd-mmm-yy and go back', () => {
    // If the year would be more than 50 years from this century
    // use the last century.
    const year = new Date().getFullYear() + 51 - 100
    const actual = parseDate(`1-Jul-${year % 100}`, 'd-mmm-yy')
    const expected = tzLocal.makeDate(year, 6, 1)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse yyyy-mm-dd HH:MM:SS', () => {
    const actual = parseDate('2020-02-29 05:01:40', 'yyyy-mm-dd HH:MM:SS')
    const expected = tzLocal.makeDate(2020, 1, 29, 5, 1, 40)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse "DD mmm", "en"', () => {
    const actual = parseDate('3rd Mar', 'DD mmm', tzLocal, 'en')
    const expected = tzLocal.makeDate(new Date().getFullYear(), 2, 3)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse "DD mmmm", "en"', () => {
    const actual = parseDate('22nd May', 'DD mmmm', tzLocal, 'en')
    const expected = tzLocal.makeDate(new Date().getFullYear(), 4, 22)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse "DD mmm", "fr"', () => {
    const actual = parseDate('11th Mars', 'DD mmm', tzLocal, 'fr')
    const expected = tzLocal.makeDate(new Date().getFullYear(), 2, 11)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse "DD mmmm", "fr"', () => {
    const actual = parseDate('3rd Janvier', 'DD mmmm', tzLocal, 'fr')
    const now = new Date()
    const expected = tzLocal.makeDate(tzLocal.year(now), 0, 3)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse "yyyy-mm-dd hh:MM:SSt", "en"', () => {
    const actual = parseDate(
      '2020-02-29 10:01:40PM',
      'yyyy-mm-dd hh:MM:SSt',
      tzLocal,
      'en'
    )
    const expected = tzLocal.makeDate(2020, 1, 29, 22, 1, 40)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse "yyyy-mm-dd hh:MM:SSt" lowercase, "en"', () => {
    const actual = parseDate(
      '2020-07-29 10:01:40pm',
      'yyyy-mm-dd hh:MM:SSt',
      tzLocal,
      'en'
    )
    const expected = tzLocal.makeDate(2020, 6, 29, 22, 1, 40)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse "yyyy-mm-dd hh:MM:SSt", "fr"', () => {
    const actual = parseDate(
      '2020-12-25 10:01:40PM',
      'yyyy-mm-dd hh:MM:SSt',
      tzLocal,
      'fr'
    )
    const expected = tzLocal.makeDate(2020, 11, 25, 22, 1, 40)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

  it('should parse extra characters not escaped', () => {
    const actual = parseDate(
      'xxxx 2000-01-01 xxxx',
      'xxxx yyyy-mm-dd xxxx',
      tzLocal,
      'en-GB'
    )
    const expected = tzLocal.makeDate(2000, 0, 1)
    expect(actual).not.toBeNull()
    expect((actual as Date).toISOString()).toBe(expected.toISOString())
  })

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
      it('should parse for different timezones', () => {
        const actual = parseDate('1-Jul-00', 'd-mmm-yy', tz, 'en')
        expect(actual).toBeDefined()
        const expected = tz.makeDate(2000, 6, 1)
        expect(tz.toISOString(actual as Date)).toBe(tz.toISOString(expected))
      })
    })
  }
})
