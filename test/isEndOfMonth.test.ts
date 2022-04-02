import { isEndOfMonth, tzUtc } from '../src'

describe('isEndOfMonth', () => {
  describe('basic', () => {
    it('should know 30 January is not the end of the month', () => {
      const date = new Date('2008-01-30T00:00:00Z')
      expect(isEndOfMonth(date)).toBeFalsy()
    })
    it('should know 31 January is not the end of the month', () => {
      const date = new Date('2008-01-31T00:00:00Z')
      expect(isEndOfMonth(date)).toBeTruthy()
    })
    it('should know 28 February 2008 is not the end of the month because 2008 is a leap year', () => {
      const date = new Date('2008-02-28T00:00:00Z')
      expect(isEndOfMonth(date)).toBeFalsy()
    })
    it('should know 29 February 2008 is the end of the month because 2008 is a leap year', () => {
      const date = new Date('2008-02-29T00:00:00Z')
      expect(isEndOfMonth(date)).toBeTruthy()
    })
    it('should know 28 February 2009 is the end of the month because 2008 is not a leap year', () => {
      const date = new Date('2009-02-28T00:00:00Z')
      expect(isEndOfMonth(date)).toBeTruthy()
    })
  })
})
