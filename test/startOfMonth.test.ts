import { startOfMonth, tzUtc } from '../src'

describe('startOfMonth', () => {
  it('should return the start of the month', () => {
    const date = new Date('2014-09-02T02:11:55.664Z')
    const actual = startOfMonth(date, tzUtc)
    const expected = new Date('2014-09-01T00:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should not change date', () => {
    const date = new Date('2014-09-01T00:00:00Z')
    const actual = startOfMonth(date, tzUtc)
    const expected = new Date('2014-09-01T00:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
