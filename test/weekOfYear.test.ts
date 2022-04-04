import { weekOfYear, tzUtc } from '../src'

describe('weekOfDate', () => {
  describe('basic', () => {
    it('returns the local week of year of the given date', () => {
      const date = new Date('2005-01-02T00:00:00Z')
      const result = weekOfYear(date, tzUtc)
      expect(result).toBe(2)
    })
  })
})
