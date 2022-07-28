import { addYears, tzUtc } from '../src'

describe('addYears', () => {
  describe('basic', () => {
    it('should add years', () => {
      const actual = addYears(new Date('2000-01-01T00:00:00Z'), 5, tzUtc)
      const expected = new Date('2005-01-01T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should subtract years', () => {
      const actual = addYears(new Date('2000-01-01T00:00:00Z'), -5, tzUtc)
      const expected = new Date('1995-01-01T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
  })

  describe('edge cases', () => {
    it('should not years', () => {
      const actual = addYears(new Date('2000-01-01T00:00:00Z'), 0, tzUtc)
      const expected = new Date('2000-01-01T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
  })
})
