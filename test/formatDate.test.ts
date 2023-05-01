import { formatDate, tzUtc } from '../src'

describe('formatDate', () => {
  it('should pass smoke test for en', () => {
    const d = new Date('2022-07-02T06:39:15.291Z')
    const s = formatDate(d, 'ddd, dd mmm yyyy HH:MM:SS Z', tzUtc, 'en')
    expect(s).toBe('Sat, 02 Jul 2022 06:39:15 UTC')
  })

  it('should pass smoke test for fr', () => {
    const d = new Date('2022-07-02T06:39:15.291Z')
    const s = formatDate(d, 'ddd, dd mmm yyyy HH:MM:SS Z', tzUtc, 'fr')
    expect(s).toBe('sam., 02 juil. 2022 06:39:15 UTC')
  })

  it('should pad d when necessary', () => {
    expect(formatDate(new Date('2001-01-09T00:00:00Z'), 'd', tzUtc)).toBe('9')
    expect(formatDate(new Date('2001-01-19T00:00:00Z'), 'd', tzUtc)).toBe('19')
  })

  it('should always pad dd when necessary', () => {
    expect(formatDate(new Date('2001-01-09T00:00:00Z'), 'dd', tzUtc)).toBe('09')
    expect(formatDate(new Date('2001-01-19T00:00:00Z'), 'dd', tzUtc)).toBe('19')
  })

  it('should get ddd', () => {
    expect(
      formatDate(new Date('2001-01-09T00:00:00Z'), 'ddd', tzUtc, 'en')
    ).toBe('Tue')
  })

  it('should get dddd', () => {
    expect(
      formatDate(new Date('2001-01-09T00:00:00Z'), 'dddd', tzUtc, 'en')
    ).toBe('Tuesday')
  })

  it('should get DDD', () => {
    expect(
      formatDate(new Date('2001-01-09T00:00:00Z'), 'DDD', tzUtc, 'en')
    ).toBe('T')
  })

  it('should pluralize', () => {
    expect(
      formatDate(new Date('2001-01-01T00:00:00Z'), 'DD', tzUtc, 'en')
    ).toBe('1st')
    expect(
      formatDate(new Date('2001-01-02T00:00:00Z'), 'DD', tzUtc, 'en')
    ).toBe('2nd')
    expect(
      formatDate(new Date('2001-01-03T00:00:00Z'), 'DD', tzUtc, 'en')
    ).toBe('3rd')
    expect(
      formatDate(new Date('2001-01-04T00:00:00Z'), 'DD', tzUtc, 'en')
    ).toBe('4th')
    expect(
      formatDate(new Date('2001-01-22T00:00:00Z'), 'DD', tzUtc, 'en')
    ).toBe('22nd')
    expect(
      formatDate(new Date('2001-01-31T00:00:00Z'), 'DD', tzUtc, 'en')
    ).toBe('31st')
  })

  it('should pad m when necessary', () => {
    expect(formatDate(new Date('2001-09-09T00:00:00Z'), 'm', tzUtc, 'en')).toBe(
      '9'
    )
    expect(formatDate(new Date('2001-10-19T00:00:00Z'), 'm', tzUtc, 'en')).toBe(
      '10'
    )
  })

  it('should always pad mm when necessary', () => {
    expect(
      formatDate(new Date('2001-09-10T00:00:00Z'), 'mm', tzUtc, 'en')
    ).toBe('09')
    expect(
      formatDate(new Date('2001-10-11T00:00:00Z'), 'mm', tzUtc, 'en')
    ).toBe('10')
  })

  it('should get mmm', () => {
    expect(
      formatDate(new Date('2001-01-09T00:00:00Z'), 'mmm', tzUtc, 'en')
    ).toBe('Jan')
  })

  it('should get mmmm', () => {
    expect(
      formatDate(new Date('2001-01-09T00:00:00Z'), 'mmmm', tzUtc, 'en')
    ).toBe('January')
  })

  it('should get yy', () => {
    expect(
      formatDate(new Date('2001-01-09T00:00:00Z'), 'yy', tzUtc, 'en')
    ).toBe('01')
  })

  it('should get yyyy', () => {
    expect(
      formatDate(new Date('2001-01-09T00:00:00Z'), 'yyyy', tzUtc, 'en')
    ).toBe('2001')
  })

  it('should pad H when necessary', () => {
    expect(formatDate(new Date('2001-01-09T01:00:00Z'), 'H', tzUtc, 'en')).toBe(
      '1'
    )
    expect(formatDate(new Date('2001-01-19T13:00:00Z'), 'H', tzUtc, 'en')).toBe(
      '13'
    )
  })

  it('should always pad HH', () => {
    expect(
      formatDate(new Date('2001-01-09T01:00:00Z'), 'HH', tzUtc, 'en')
    ).toBe('01')
  })

  it('should pad M when necessary', () => {
    expect(formatDate(new Date('2001-01-09T01:01:00Z'), 'M', tzUtc, 'en')).toBe(
      '1'
    )
    expect(formatDate(new Date('2001-01-19T13:13:00Z'), 'M', tzUtc, 'en')).toBe(
      '13'
    )
  })

  it('should always pad MM', () => {
    expect(
      formatDate(new Date('2001-01-09T01:02:00Z'), 'MM', tzUtc, 'en')
    ).toBe('02')
  })

  it('should pad S when necessary', () => {
    expect(formatDate(new Date('2001-01-09T01:01:05Z'), 'S', tzUtc, 'en')).toBe(
      '5'
    )
    expect(formatDate(new Date('2001-01-19T13:13:26Z'), 'S', tzUtc, 'en')).toBe(
      '26'
    )
  })

  it('should always pad SS', () => {
    expect(formatDate(new Date('2001-01-09T01:02:59Z'), 'S', tzUtc, 'en')).toBe(
      '59'
    )
  })

  it('should get F', () => {
    expect(
      formatDate(new Date('2001-01-09T01:02:59.123Z'), 'F', tzUtc, 'en')
    ).toBe('1')
  })

  it('should get FF', () => {
    expect(
      formatDate(new Date('2001-01-09T01:02:59.123Z'), 'FF', tzUtc, 'en')
    ).toBe('12')
    expect(
      formatDate(new Date('2001-01-09T01:02:59.023Z'), 'FF', tzUtc, 'en')
    ).toBe('02')
  })

  it('should get FFF', () => {
    expect(
      formatDate(new Date('2001-01-09T01:02:59.123Z'), 'FFF', tzUtc, 'en')
    ).toBe('123')
    expect(
      formatDate(new Date('2001-01-09T01:02:59.003Z'), 'FFF', tzUtc, 'en')
    ).toBe('003')
  })
})
