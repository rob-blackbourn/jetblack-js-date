import { parseDate, tzUtc } from '../src'

describe('parseDate', () => {
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

  it('should fail to parse leap year date', () => {
    const actual = parseDate('2019-02-29', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse month with too many digits', () => {
    const actual = parseDate('2016-1234-12', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse month out of range', () => {
    const actual = parseDate('2016-31-12', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse zero month', () => {
    const actual = parseDate('2016-00-12', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })

  it('should fail to parse 13th month', () => {
    const actual = parseDate('2016-13-12', 'yyyy-mm-dd', 'en-GB')
    expect(actual).toBeNull()
  })
})
