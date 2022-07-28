import { lastDayOfYear, tzUtc } from '../src'

describe('lastDayOfYear', () => {
  it('should find the last moment of the year', () => {
    const actual = lastDayOfYear(new Date('2000-01-01T00:00:00Z'), tzUtc)
    const expected = new Date('2000-12-31T00:00:00.000Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
