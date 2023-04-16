import { endOfMinute } from '../src'

describe('endOfMinute', () => {
  it('should find the last moment of the minute', () => {
    const actual = endOfMinute(new Date('2000-01-01T00:00:00Z'))
    const expected = new Date('2000-01-01T00:00:59.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
