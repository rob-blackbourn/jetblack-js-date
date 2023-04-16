import { startOfHour } from '../src'

describe('startOfHour', () => {
  it('should clear minutes', () => {
    const date = new Date('2014-09-02T02:11:55.664Z')
    const actual = startOfHour(date)
    const expected = new Date('2014-09-02T02:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should not change date', () => {
    const date = new Date('2014-09-02T02:00:00Z')
    const actual = startOfHour(date)
    const expected = new Date('2014-09-02T02:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
