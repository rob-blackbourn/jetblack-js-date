import { tzUtc, dayRange } from '../src'

describe('range', () => {
  describe('dayRange', () => {
    it('should create a day range', () => {
      const actual = dayRange(
        new Date('2000-01-01T00:00:00Z'),
        new Date('2000-01-05T00:00:00Z'),
        1,
        tzUtc
      )
      const expected = [
        new Date('2000-01-01T00:00:00Z'),
        new Date('2000-01-02T00:00:00Z'),
        new Date('2000-01-03T00:00:00Z'),
        new Date('2000-01-04T00:00:00Z'),
        new Date('2000-01-05T00:00:00Z')
      ]
      actual.forEach((value, index) =>
        expect(value.getTime()).toBe(expected[index].getTime())
      )
    })
  })
})
