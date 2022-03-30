import { Duration } from '../src'

describe('Duration', () => {
  describe('construct', () => {
    it('should construct a duration', () => {
      const expectedYears = 1
      const expectedMonths = 1
      const expectedWeeks = 1
      const expectedDays = 1
      const expectedHours = 1
      const expectedMinutes = 1
      const expectedSeconds = 1
      const actual = new Duration(
        expectedYears,
        expectedMonths,
        expectedWeeks,
        expectedDays,
        expectedHours,
        expectedMinutes,
        expectedSeconds
      )
      expect(actual.years).toBe(expectedYears)
      expect(actual.months).toBe(expectedMonths)
      expect(actual.weeks).toBe(expectedWeeks)
      expect(actual.days).toBe(expectedDays)
      expect(actual.hours).toBe(expectedHours)
      expect(actual.minutes).toBe(expectedMinutes)
      expect(actual.seconds).toBe(expectedSeconds)
    })

    it('should simplify a duration for months', () => {
      const actual = new Duration(0, 24, 0, 0, 0, 0, 0)
      expect(actual.years).toBe(2)
      expect(actual.months).toBe(0)
      expect(actual.weeks).toBe(0)
      expect(actual.days).toBe(0)
      expect(actual.hours).toBe(0)
      expect(actual.minutes).toBe(0)
      expect(actual.seconds).toBe(0)
    })

    it('should simplify a duration for days', () => {
      const actual = new Duration(0, 0, 0, 8, 0, 0, 0)
      expect(actual.years).toBe(0)
      expect(actual.months).toBe(0)
      expect(actual.weeks).toBe(1)
      expect(actual.days).toBe(1)
      expect(actual.hours).toBe(0)
      expect(actual.minutes).toBe(0)
      expect(actual.seconds).toBe(0)
    })
  })

  describe('parse', () => {
    it('should parse a duration', () => {
      const expected = 'P1Y2M3W4DT5H6M7S'
      const actual = Duration.parse(expected)
      expect(actual.toString()).toBe(expected)
    })
  })

  describe('spread', () => {
    it('should spread the properties of a duration', () => {
      const { years, months, weeks, days, hours, minutes, seconds } =
        Duration.parse('P1Y2M3W4DT5H6M7S')
      expect(years).toBe(1)
      expect(months).toBe(2)
      expect(weeks).toBe(3)
      expect(days).toBe(4)
      expect(hours).toBe(5)
      expect(minutes).toBe(6)
      expect(seconds).toBe(7)
    })
  })
})
