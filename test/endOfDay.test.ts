import { endOfDay, tzUtc } from '../src'

describe('endOfDay', () => {
  it('should find the last moment of the day', () => {
    const actual = endOfDay(new Date('2000-01-01T00:00:00Z'), tzUtc)
    const expected = new Date('2000-01-01T23:59:59.999Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
