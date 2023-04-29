import { parseDate, tzUtc } from '../src'

describe('parseDate', () => {
  it('should fail to parse leap year date', () => {
    const actual = parseDate('2019-02-29', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse month with too many digits', () => {
    const actual = parseDate('2016-1234-12', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse zero month', () => {
    const actual = parseDate('2016-00-12', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse month out of range', () => {
    const actual = parseDate('2016-31-12', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse 13th month', () => {
    const actual = parseDate('2016-13-12', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse day with too many digits', () => {
    const actual = parseDate('2016-01-1234', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse day with too few digits', () => {
    const actual = parseDate('2016-01-1', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse zero day', () => {
    const actual = parseDate('2016-01-00', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse day out of range', () => {
    const actual = parseDate('2016-01-32', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })
  it('should parse ISO date', () => {
    const actual = parseDate('2000-01-01', 'yyyy-mm-dd', 'en-GB')
    const expected = new Date('2000-01-01T00:00:00Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse ISO datetime', () => {
    const actual = parseDate(
      '2000-01-01T12:35:59.999Z',
      'yyyy-mm-dd[T]HH:MM:SS.FFFZ',
      'en-GB'
    )
    const expected = new Date('2000-01-01T12:35:59.999Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse ISO datetime with timezone', () => {
    const actual = parseDate(
      '2000-01-01T12:35:59.999+01:00',
      'yyyy-mm-dd[T]HH:MM:SS.FFFZ',
      'en-GB'
    )
    const expected = new Date('2000-01-01T11:35:59.999Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse leap year date', () => {
    const actual = parseDate('2020-02-29', 'yyyy-mm-dd', 'en-GB')
    const expected = new Date('2020-02-29T00:00:00.000Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse yyyy/mm/dd', () => {
    const actual = parseDate('2020/02/29', 'yyyy/mm/dd')
    const expected = new Date('2020-02-29T00:00:00.000Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse yyyymmdd', () => {
    const actual = parseDate('20200229', 'yyyymmdd')
    const expected = new Date('2020-02-29T00:00:00.000Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse mm/dd/yy', () => {
    const actual = parseDate('02/29/20', 'mm/dd/yy')
    const expected = new Date('2020-02-29T00:00:00.000Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse dd/mm/yy', () => {
    const actual = parseDate('29/02/20', 'dd/mm/yy')
    const expected = new Date('2020-02-29T00:00:00.000Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse d/m/yy', () => {
    const actual = parseDate('29/2/20', 'd/m/yy')
    const expected = new Date('2020-02-29T00:00:00.000Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse yyyy-mm-dd HH:MM:SS', () => {
    const actual = parseDate('2020-02-29 05:01:40', 'yyyy-mm-dd HH:MM:SS')
    const expected = new Date('2020-02-29T05:01:40.000Z')
    expect(tzUtc.toISOString(actual as Date)).toBe(tzUtc.toISOString(expected))
  })

  it('should parse "DD mmm", "en"', () => {
    const actual = parseDate('3rd Mar', 'DD mmm', 'en')
    const expected = new Date('2023-03-03T00:00:00.000Z')
    expect(tzUtc.monthIndex(actual as Date)).toBe(tzUtc.monthIndex(expected))
    expect(tzUtc.day(actual as Date)).toBe(tzUtc.day(expected))
  })

  it('should parse "DD mmmm", "en"', () => {
    const actual = parseDate('3rd January', 'DD mmmm', 'en')
    const expected = new Date('2000-01-03T00:00:00.000Z')
    expect(tzUtc.monthIndex(actual as Date)).toBe(tzUtc.monthIndex(expected))
    expect(tzUtc.day(actual as Date)).toBe(tzUtc.day(expected))
  })

  it('should parse "DD mmm", "fr"', () => {
    const actual = parseDate('3rd Mars', 'DD mmm', 'fr')
    const expected = new Date('2023-03-03T00:00:00.000Z')
    expect(tzUtc.monthIndex(actual as Date)).toBe(tzUtc.monthIndex(expected))
    expect(tzUtc.day(actual as Date)).toBe(tzUtc.day(expected))
  })

  it('should parse "DD mmmm", "fr"', () => {
    const actual = parseDate('3rd Janvier', 'DD mmmm', 'fr')
    const expected = new Date('2023-01-03T00:00:00.000Z')
    expect(tzUtc.monthIndex(actual as Date)).toBe(tzUtc.monthIndex(expected))
    expect(tzUtc.day(actual as Date)).toBe(tzUtc.day(expected))
  })
})
