import { startOfSecond } from '../src'

describe('startOfSecond', () => {
  it('should clear milliseconds', () => {
    const date = new Date('2014-09-02T02:11:55.754Z')
    const actual = startOfSecond(date)
    const expected = new Date('2014-09-02T02:11:55.000Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should not change date', () => {
    const date = new Date('2014-09-02T02:11:55.000Z')
    const actual = startOfSecond(date)
    const expected = new Date('2014-09-02T02:11:55.000Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
