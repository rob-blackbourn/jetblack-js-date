import { dateFormat, tzUtc, tzLocal } from '../src'

describe('dateFormat', () => {
  it('should pass smoke test', () => {
    const d = new Date('2022-07-02T06:39:15.291Z')
    const s = dateFormat(d, 'ddd, dd mmm yyyy HH:MM:ss Z', tzUtc)
    expect(s).toBe('Sat, 02 Jul 2022 06:39:15 UTC')
  })

  it('should pad d when necessary', () => {
    expect(dateFormat(new Date('2001-01-09T00:00:00Z'), 'd', tzUtc)).toBe('9')
    expect(dateFormat(new Date('2001-01-19T00:00:00Z'), 'd', tzUtc)).toBe('19')
  })

  it('should always pad dd when necessary', () => {
    expect(dateFormat(new Date('2001-01-09T00:00:00Z'), 'dd', tzUtc)).toBe('09')
    expect(dateFormat(new Date('2001-01-19T00:00:00Z'), 'dd', tzUtc)).toBe('19')
  })
})
