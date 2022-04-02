import { Duration, subDuration } from '../src'

describe('subDuration', () => {
  describe('basic', () => {
    it('should subtract duration', () => {
      const duration = new Duration('P1D')
      const actual = subDuration(new Date('2000-01-01T00:00:00Z'), duration)
      const expected = new Date('1999-12-31T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
    it('should subtract a negative duration', () => {
      const duration = new Duration('-P1D')
      const actual = subDuration(new Date('2000-01-01T00:00:00Z'), duration)
      const expected = new Date('2000-01-02T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })
})
