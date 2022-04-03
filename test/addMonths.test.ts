import { addMonths } from '../src'

describe('addMonths', () => {
  describe('basic', () => {
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
})