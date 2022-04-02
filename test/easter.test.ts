import { easter, tzUtc } from '../src'

describe('easter', () => {
  describe('basic', () => {
    it('should calculate Easter in 2001', () => {
      const actual = easter(2001, tzUtc)
      const expected = new Date('2001-04-15T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
    it('should calculate Easter in 2002', () => {
      const actual = easter(2002, tzUtc)
      const expected = new Date('2002-03-31T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
    it('should calculate Easter in 2003', () => {
      const actual = easter(2003, tzUtc)
      const expected = new Date('2003-04-20T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
    it('should calculate Easter in 2004', () => {
      const actual = easter(2004, tzUtc)
      const expected = new Date('2004-04-11T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
    it('should calculate Easter in 2005', () => {
      const actual = easter(2005, tzUtc)
      const expected = new Date('2005-03-27T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
    it('should calculate Easter in 2006', () => {
      const actual = easter(2006, tzUtc)
      const expected = new Date('2006-04-16T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
    it('should calculate Easter in 2007', () => {
      const actual = easter(2007, tzUtc)
      const expected = new Date('2007-04-08T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
    it('should calculate Easter in 2008', () => {
      const actual = easter(2008, tzUtc)
      const expected = new Date('2008-03-23T00:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
  })
})
