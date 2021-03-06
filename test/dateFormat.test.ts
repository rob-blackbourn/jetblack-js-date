import { dateFormat, tzUtc, tzLocal } from '../src'

describe('dateFormat', () => {
  it('should pass smoke test for en', () => {
    const d = new Date('2022-07-02T06:39:15.291Z')
    const s = dateFormat(d, 'ddd, dd mmm yyyy HH:MM:SS Z', tzUtc, 'en')
    expect(s).toBe('Sat, 02 Jul 2022 06:39:15 UTC')
  })

  it('should pass smoke test for fr', () => {
    const d = new Date('2022-07-02T06:39:15.291Z')
    const s = dateFormat(d, 'ddd, dd mmm yyyy HH:MM:SS Z', tzUtc, 'fr')
    expect(s).toBe('sam., 02 juil. 2022 06:39:15 UTC')
  })

  it('should pad d when necessary', () => {
    expect(dateFormat(new Date('2001-01-09T00:00:00Z'), 'd', tzUtc, 'en')).toBe(
      '9'
    )
    expect(dateFormat(new Date('2001-01-19T00:00:00Z'), 'd', tzUtc, 'en')).toBe(
      '19'
    )
  })

  it('should always pad dd when necessary', () => {
    expect(
      dateFormat(new Date('2001-01-09T00:00:00Z'), 'dd', tzUtc, 'en')
    ).toBe('09')
    expect(
      dateFormat(new Date('2001-01-19T00:00:00Z'), 'dd', tzUtc, 'en')
    ).toBe('19')
  })

  it('should get ddd', () => {
    expect(
      dateFormat(new Date('2001-01-09T00:00:00Z'), 'ddd', tzUtc, 'en')
    ).toBe('Tue')
  })

  it('should get dddd', () => {
    expect(
      dateFormat(new Date('2001-01-09T00:00:00Z'), 'dddd', tzUtc, 'en')
    ).toBe('Tuesday')
  })

  it('should pad m when necessary', () => {
    expect(dateFormat(new Date('2001-09-09T00:00:00Z'), 'm', tzUtc, 'en')).toBe(
      '9'
    )
    expect(dateFormat(new Date('2001-10-19T00:00:00Z'), 'm', tzUtc, 'en')).toBe(
      '10'
    )
  })

  it('should always pad mm when necessary', () => {
    expect(
      dateFormat(new Date('2001-09-10T00:00:00Z'), 'mm', tzUtc, 'en')
    ).toBe('09')
    expect(
      dateFormat(new Date('2001-10-11T00:00:00Z'), 'mm', tzUtc, 'en')
    ).toBe('10')
  })

  it('should get mmm', () => {
    expect(
      dateFormat(new Date('2001-01-09T00:00:00Z'), 'mmm', tzUtc, 'en')
    ).toBe('Jan')
  })

  it('should get mmmm', () => {
    expect(
      dateFormat(new Date('2001-01-09T00:00:00Z'), 'mmmm', tzUtc, 'en')
    ).toBe('January')
  })

  it('should get yy', () => {
    expect(
      dateFormat(new Date('2001-01-09T00:00:00Z'), 'yy', tzUtc, 'en')
    ).toBe('01')
  })

  it('should get yyyy', () => {
    expect(
      dateFormat(new Date('2001-01-09T00:00:00Z'), 'yyyy', tzUtc, 'en')
    ).toBe('2001')
  })

  it('should pad H when necessary', () => {
    expect(dateFormat(new Date('2001-01-09T01:00:00Z'), 'H', tzUtc, 'en')).toBe(
      '1'
    )
    expect(dateFormat(new Date('2001-01-19T13:00:00Z'), 'H', tzUtc, 'en')).toBe(
      '13'
    )
  })

  it('should always pad HH', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:00:00Z'), 'HH', tzUtc, 'en')
    ).toBe('01')
  })

  it('should pad M when necessary', () => {
    expect(dateFormat(new Date('2001-01-09T01:01:00Z'), 'M', tzUtc, 'en')).toBe(
      '1'
    )
    expect(dateFormat(new Date('2001-01-19T13:13:00Z'), 'M', tzUtc, 'en')).toBe(
      '13'
    )
  })

  it('should always pad MM', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:02:00Z'), 'MM', tzUtc, 'en')
    ).toBe('02')
  })

  it('should pad S when necessary', () => {
    expect(dateFormat(new Date('2001-01-09T01:01:05Z'), 'S', tzUtc, 'en')).toBe(
      '5'
    )
    expect(dateFormat(new Date('2001-01-19T13:13:26Z'), 'S', tzUtc, 'en')).toBe(
      '26'
    )
  })

  it('should always pad SS', () => {
    expect(dateFormat(new Date('2001-01-09T01:02:59Z'), 'S', tzUtc, 'en')).toBe(
      '59'
    )
  })

  it('should get F', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:02:59.123Z'), 'F', tzUtc, 'en')
    ).toBe('1')
  })

  it('should get FF', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:02:59.123Z'), 'FF', tzUtc, 'en')
    ).toBe('12')
    expect(
      dateFormat(new Date('2001-01-09T01:02:59.023Z'), 'FF', tzUtc, 'en')
    ).toBe('02')
  })

  it('should get FFF', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:02:59.123Z'), 'FFF', tzUtc, 'en')
    ).toBe('123')
    expect(
      dateFormat(new Date('2001-01-09T01:02:59.003Z'), 'FFF', tzUtc, 'en')
    ).toBe('003')
  })
})
