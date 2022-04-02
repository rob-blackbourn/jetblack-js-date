import { startOfWeekYear, tzUtc } from '../src'

describe('startOfWeekYear', () => {
  describe('basic', () => {
    it('returns the date with the time set to 00:00:00 and the date set to the first day of a week year', () => {
      const date = new Date('2005-07-02T00:00:00Z')
      const actual = startOfWeekYear(date, tzUtc)
      const expected = new Date('2004-12-26T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
    it('for Jan 2 2005', () => {
      const date = new Date('2005-01-02T00:00:00Z')
      const actual = startOfWeekYear(date, tzUtc)
      const expected = new Date('2004-12-26T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
  })
})
