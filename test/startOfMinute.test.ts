import { startOfMinute } from '../src'

describe('startOfMinute', () => {
  it('should clear seconds', () => {
    const date = new Date('2014-09-02T02:11:55.664Z')
    const actual = startOfMinute(date)
    const expected = new Date('2014-09-02T02:11:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should not change date', () => {
    const date = new Date('2014-09-02T02:11:00Z')
    const actual = startOfMinute(date)
    const expected = new Date('2014-09-02T02:11:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
