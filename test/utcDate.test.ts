import { tzUtc, addYears, addMonths, addDays } from '../src'

describe('date', () => {
  describe('utcDate', () => {
    it('should construct a date', () => {
      const actual = tzUtc.makeDate(2000, 0, 1)
      const expected = new Date('2000-01-01T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })

  describe('addYears', () => {
    it('should add years', () => {
      const actual = addYears(new Date('2000-01-01T00:00:00Z'), 5)
      const expected = new Date('2005-01-01T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
    it('should subtract years', () => {
      const actual = addYears(new Date('2000-01-01T00:00:00Z'), -5)
      const expected = new Date('1995-01-01T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })

  describe('addMonths', () => {
    it('should add months', () => {
      const actual = addMonths(new Date('2000-01-01T00:00:00Z'), 13)
      const expected = new Date('2001-02-01T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
    it('should subtract months', () => {
      const actual = addMonths(new Date('2000-01-01T00:00:00Z'), -13)
      const expected = new Date('1998-12-01T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })

  describe('addDays', () => {
    it('should add days', () => {
      const actual = addDays(new Date('2000-01-01T00:00:00Z'), 40)
      const expected = new Date('2000-02-10T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
    it('should subtract days', () => {
      const actual = addDays(new Date('2000-01-01T00:00:00Z'), -40)
      const expected = new Date('1999-11-22T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })
})
