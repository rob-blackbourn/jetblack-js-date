import { dateFormat, tzUtc, tzLocal } from '../src'

describe('dateFormat', () => {
  it('should pass smoke test for en', () => {
    const d = new Date('2022-07-02T06:39:15.291Z')
    const s = dateFormat(
      d,
      'ddd, dd mmm yyyy HH:MM:SS Z',
      { locale: 'en' },
      tzUtc
    )
    expect(s).toBe('Sat, 02 Jul 2022 06:39:15 UTC')
  })

  it('should pass smoke test for fr', () => {
    const d = new Date('2022-07-02T06:39:15.291Z')
    const s = dateFormat(
      d,
      'ddd, dd mmm yyyy HH:MM:SS Z',
      { locale: 'fr' },
      tzUtc
    )
    expect(s).toBe('sam., 02 juil. 2022 06:39:15 UTC')
  })

  it('should pad d when necessary', () => {
    expect(
      dateFormat(new Date('2001-01-09T00:00:00Z'), 'd', { locale: 'en' }, tzUtc)
    ).toBe('9')
    expect(
      dateFormat(new Date('2001-01-19T00:00:00Z'), 'd', { locale: 'en' }, tzUtc)
    ).toBe('19')
  })

  it('should always pad dd when necessary', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T00:00:00Z'),
        'dd',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('09')
    expect(
      dateFormat(
        new Date('2001-01-19T00:00:00Z'),
        'dd',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('19')
  })

  it('should get ddd', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T00:00:00Z'),
        'ddd',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('Tue')
  })

  it('should get dddd', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T00:00:00Z'),
        'dddd',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('Tuesday')
  })

  it('should pad m when necessary', () => {
    expect(
      dateFormat(new Date('2001-09-09T00:00:00Z'), 'm', { locale: 'en' }, tzUtc)
    ).toBe('9')
    expect(
      dateFormat(new Date('2001-10-19T00:00:00Z'), 'm', { locale: 'en' }, tzUtc)
    ).toBe('10')
  })

  it('should always pad mm when necessary', () => {
    expect(
      dateFormat(
        new Date('2001-09-10T00:00:00Z'),
        'mm',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('09')
    expect(
      dateFormat(
        new Date('2001-10-11T00:00:00Z'),
        'mm',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('10')
  })

  it('should get mmm', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T00:00:00Z'),
        'mmm',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('Jan')
  })

  it('should get mmmm', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T00:00:00Z'),
        'mmmm',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('January')
  })

  it('should get yy', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T00:00:00Z'),
        'yy',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('01')
  })

  it('should get yyyy', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T00:00:00Z'),
        'yyyy',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('2001')
  })

  it('should pad H when necessary', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:00:00Z'), 'H', { locale: 'en' }, tzUtc)
    ).toBe('1')
    expect(
      dateFormat(new Date('2001-01-19T13:00:00Z'), 'H', { locale: 'en' }, tzUtc)
    ).toBe('13')
  })

  it('should always pad HH', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T01:00:00Z'),
        'HH',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('01')
  })

  it('should pad M when necessary', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:01:00Z'), 'M', { locale: 'en' }, tzUtc)
    ).toBe('1')
    expect(
      dateFormat(new Date('2001-01-19T13:13:00Z'), 'M', { locale: 'en' }, tzUtc)
    ).toBe('13')
  })

  it('should always pad MM', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T01:02:00Z'),
        'MM',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('02')
  })

  it('should pad S when necessary', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:01:05Z'), 'S', { locale: 'en' }, tzUtc)
    ).toBe('5')
    expect(
      dateFormat(new Date('2001-01-19T13:13:26Z'), 'S', { locale: 'en' }, tzUtc)
    ).toBe('26')
  })

  it('should always pad SS', () => {
    expect(
      dateFormat(new Date('2001-01-09T01:02:59Z'), 'S', { locale: 'en' }, tzUtc)
    ).toBe('59')
  })

  it('should get F', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T01:02:59.123Z'),
        'F',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('1')
  })

  it('should get FF', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T01:02:59.123Z'),
        'FF',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('12')
    expect(
      dateFormat(
        new Date('2001-01-09T01:02:59.023Z'),
        'FF',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('02')
  })

  it('should get FFF', () => {
    expect(
      dateFormat(
        new Date('2001-01-09T01:02:59.123Z'),
        'FFF',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('123')
    expect(
      dateFormat(
        new Date('2001-01-09T01:02:59.003Z'),
        'FFF',
        { locale: 'en' },
        tzUtc
      )
    ).toBe('003')
  })
})
