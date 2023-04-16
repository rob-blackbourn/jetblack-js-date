import { endOfHour } from '../src'

describe('endOfHour', () => {
  it('should find the last moment of the hour', () => {
    const actual = endOfHour(new Date('2000-01-01T00:00:00Z'))
    const expected = new Date('2000-01-01T00:59:59.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
