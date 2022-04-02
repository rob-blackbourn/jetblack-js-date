import { weekYear, tzUtc } from '../src'

describe('weekYear', () => {
  describe('basic', () => {
    it('returns the local week-numbering year of the given date', () => {
      const date = new Date('2004-12-26T00:00:00Z')
      const result = weekYear(date, tzUtc)
      expect(result).toBe(2005)
    })
  })
})
