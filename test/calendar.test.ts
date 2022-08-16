import { calWeekends, tzUtc } from '../src'

describe('calendar', () => {
  describe('calWeekends', () => {
    it('should know 19 December 2014 was a Friday', () => {
      const date = new Date('2014-12-19T00:00:00Z')
      expect(calWeekends.isWeekend(date, tzUtc)).toBeFalsy()
    })

    it('should know 20 December 2014 was a Saturday', () => {
      const date = new Date('2014-12-20T00:00:00Z')
      expect(calWeekends.isWeekend(date, tzUtc)).toBeTruthy()
    })

    it('should know 21 December 2014 was a Sunday', () => {
      const date = new Date('2014-12-21T00:00:00Z')
      expect(calWeekends.isWeekend(date, tzUtc)).toBeTruthy()
    })

    it('should know 22 December 2014 was a Monday', () => {
      const date = new Date('2014-12-22T00:00:00Z')
      expect(calWeekends.isWeekend(date, tzUtc)).toBeFalsy()
    })
  })
})
