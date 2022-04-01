import { maxDate } from '../src'

describe('maxDate', () => {
  describe('basic', () => {
    it('should find the smallest date', () => {
      const actual = maxDate(
        new Date('2000-01-10T00:00:00Z'),
        new Date('2000-01-01T00:00:00Z'),
        new Date('2000-01-04T00:00:00Z')
      )
      const expected = new Date('2000-01-10T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
  })
})
