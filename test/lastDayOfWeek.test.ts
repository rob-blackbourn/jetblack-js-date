import { lastDayOfWeek, tzUtc } from '../src'

describe('lastDayOfWeek', () => {
  it('should find the last moment of the week from Sunday', () => {
    const actual = lastDayOfWeek(new Date('2022-07-03T00:00:00Z'), tzUtc)
    const expected = new Date('2022-07-09T00:00:00.000Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should find the last moment of the week from Wednesday', () => {
    const actual = lastDayOfWeek(new Date('2022-07-06T00:00:00Z'), tzUtc)
    const expected = new Date('2022-07-09T00:00:00.000Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should find the last moment of the week from Saturday', () => {
    const actual = lastDayOfWeek(new Date('2022-07-09T00:00:00Z'), tzUtc)
    const expected = new Date('2022-07-09T00:00:00.000Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
