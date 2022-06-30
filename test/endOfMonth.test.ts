import { endOfMonth, tzUtc } from '../src'

describe('endOfMonth', () => {
  it('should find the last moment of the month', () => {
    const actual = endOfMonth(new Date('2000-01-01T00:00:00Z'), tzUtc)
    const expected = new Date('2000-01-31T23:59:59.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
