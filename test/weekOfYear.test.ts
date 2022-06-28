import { weekOfYear, tzUtc } from '../src'

describe('weekOfDate', () => {
  it('returns the local week of year of the given date', () => {
    const date = new Date('2005-01-02T00:00:00Z')
    const result = weekOfYear(date, tzUtc)
    expect(result).toBe(1)
  })

  it('returns the week of year of the given date', () => {
    const date = new Date('2006-01-01T00:00:00Z')
    const result = weekOfYear(date, tzUtc)
    expect(result).toBe(1)
  })

  it('returns the week of year of the given date', () => {
    const date = new Date('2006-12-31T00:00:00Z')
    const result = weekOfYear(date, tzUtc)
    expect(result).toBe(53)
  })

  it('returns the week of year of the given date', () => {
    const date = new Date('2015-12-31T00:00:00Z')
    const result = weekOfYear(date, tzUtc)
    expect(result).toBe(53)
  })
})
