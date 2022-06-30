import { endOfSecond, tzUtc } from '../src'

describe('endOfSecond', () => {
  it('should find the last moment of the second', () => {
    const actual = endOfSecond(new Date('2000-01-01T00:00:00Z'), tzUtc)
    const expected = new Date('2000-01-01T00:00:00.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
