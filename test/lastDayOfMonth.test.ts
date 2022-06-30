import { lastDayOfMonth, tzUtc } from '../src'

describe('lastDayOfMonth', () => {
  it('should find the last day of the month', () => {
    const actual = lastDayOfMonth(new Date('2000-01-01T00:00:00Z'), tzUtc)
    const expected = new Date('2000-01-31T00:00:00.000Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
