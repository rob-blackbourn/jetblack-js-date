import { endOfYear, tzUtc } from '../src'

describe('endOfYear', () => {
  it('should find the last moment of the year', () => {
    const actual = endOfYear(new Date('2000-01-01T00:00:00Z'), tzUtc)
    const expected = new Date('2000-12-31T23:59:59.999Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
