import { dayOfYear, tzUtc } from '../src'

describe('dayOfYear', () => {
  it('returns the local week of year of the given date', () => {
    const date = new Date('2000-05-01T00:00:00Z')
    const result = dayOfYear(date, tzUtc)
    expect(result).toBe(122)
  })
})
