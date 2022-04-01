import { tzUtc } from '../src'

describe('utcDate', () => {
  describe('basic', () => {
    it('should construct a date', () => {
      const actual = tzUtc.makeDate(2000, 0, 1)
      const expected = new Date('2000-01-01T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should construct a date with time', () => {
      const actual = tzUtc.makeDate(2000, 0, 1, 12, 30, 15, 250)
      const expected = new Date('2000-01-01T12:30:15.250Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })
})
