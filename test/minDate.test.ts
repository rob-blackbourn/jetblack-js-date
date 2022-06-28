import { minDate } from '../src'

describe('minDate', () => {
  it('should find the smallest date', () => {
    const actual = minDate(
      new Date('2000-01-10T00:00:00Z'),
      new Date('2000-01-01T00:00:00Z'),
      new Date('2000-01-04T00:00:00Z')
    )
    const expected = new Date('2000-01-01T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
