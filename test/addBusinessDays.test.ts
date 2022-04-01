import { addBusinessDays } from '../src'

describe('addBusinessDays', () => {
  describe('basic', () => {
    it('should add business days within week', () => {
      // Mon 3 Jan 2000
      const actual = addBusinessDays(new Date('2000-01-03T00:00:00Z'), 1)
      const expected = new Date('2000-01-04T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should subtract business days within week', () => {
      // Tue 4 Jan 2000
      const actual = addBusinessDays(new Date('2000-01-04T00:00:00Z'), -1)
      const expected = new Date('2000-01-03T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should add business days across a weekend', () => {
      // Fri 7 Jan 2000
      const actual = addBusinessDays(new Date('2000-01-07T00:00:00Z'), 1)
      const expected = new Date('2000-01-10T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should subtract business days across a weekend', () => {
      // Mon 10 Jan 2000
      const actual = addBusinessDays(new Date('2000-01-10T00:00:00Z'), -1)
      const expected = new Date('2000-01-07T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })
})
