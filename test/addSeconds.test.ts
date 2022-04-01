import { addSeconds } from '../src'

describe('addSeconds', () => {
  describe('basic', () => {
    it('should add seconds', () => {
      const actual = addSeconds(new Date('2000-01-01T00:00:00Z'), 1)
      const expected = new Date('2000-01-01T00:00:01Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
    it('should subtract seconds', () => {
      const actual = addSeconds(new Date('2000-01-01T00:00:00Z'), -1)
      const expected = new Date('1999-12-31T23:59:59Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })
})
