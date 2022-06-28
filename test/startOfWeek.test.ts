import { startOfWeek, tzUtc } from '../src'

describe('startOfWeek', () => {
  it('returns the date with the time set to 00:00:00 and the date set to the first day of a week', () => {
    const date = new Date('2014-09-02T02:11:55Z')
    const actual = startOfWeek(date, tzUtc)
    const expected = new Date('2014-08-31T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('for Jan 2 2005', () => {
    const date = new Date('2005-01-02T00:00:00Z')
    const actual = startOfWeek(date, tzUtc)
    const expected = new Date('2005-01-02T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
