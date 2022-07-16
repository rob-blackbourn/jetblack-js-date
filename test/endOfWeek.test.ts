import { endOfWeek, tzUtc } from '../src'

describe('endOfWeek', () => {
  it('should find the last moment of the week from Sunday', () => {
    const actual = endOfWeek(new Date('2022-07-03T00:00:00Z'), tzUtc)
    const expected = new Date('2022-07-09T23:59:59.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should find the last moment of the week from Wednesday', () => {
    const actual = endOfWeek(new Date('2022-07-06T00:00:00Z'), tzUtc)
    const expected = new Date('2022-07-09T23:59:59.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should find the last moment of the week from Saturday', () => {
    const actual = endOfWeek(new Date('2022-07-09T00:00:00Z'), tzUtc)
    const expected = new Date('2022-07-09T23:59:59.999Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
