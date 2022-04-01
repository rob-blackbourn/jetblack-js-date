import { addDays } from '../src'

describe('addDays', () => {
  describe('basic', () => {
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
