import { findWeekdayIndex, lastWeekdayIndex, tzUtc } from '../src'

describe('indices', () => {
  describe('weekday', () => {
    it('should find weekday', () => {
      const actual = findWeekdayIndex(
        [
          new Date('2000-01-01T00:00:00Z'),
          new Date('2000-01-02T00:00:00Z'),
          new Date('2000-01-03T00:00:00Z'),
          new Date('2000-01-04T00:00:00Z'),
          new Date('2000-01-05T00:00:00Z'),
          new Date('2000-01-06T00:00:00Z'),
          new Date('2000-01-07T00:00:00Z'),
          new Date('2000-01-08T00:00:00Z'),
          new Date('2000-01-09T00:00:00Z'),
          new Date('2000-01-10T00:00:00Z'),
          new Date('2000-01-11T00:00:00Z'),
          new Date('2000-01-12T00:00:00Z'),
          new Date('2000-01-13T00:00:00Z'),
          new Date('2000-01-14T00:00:00Z')
        ],
        1, //Monday
        tzUtc
      )
      expect(actual).toBe(2)
    })

    it('should find last weekday', () => {
      const actual = lastWeekdayIndex(
        [
          new Date('2000-01-01T00:00:00Z'),
          new Date('2000-01-02T00:00:00Z'),
          new Date('2000-01-03T00:00:00Z'),
          new Date('2000-01-04T00:00:00Z'),
          new Date('2000-01-05T00:00:00Z'),
          new Date('2000-01-06T00:00:00Z'),
          new Date('2000-01-07T00:00:00Z'),
          new Date('2000-01-08T00:00:00Z'),
          new Date('2000-01-09T00:00:00Z'),
          new Date('2000-01-10T00:00:00Z'),
          new Date('2000-01-11T00:00:00Z'),
          new Date('2000-01-12T00:00:00Z'),
          new Date('2000-01-13T00:00:00Z'),
          new Date('2000-01-14T00:00:00Z')
        ],
        1, //Monday
        tzUtc
      )
      expect(actual).toBe(9)
    })

    it('should not find weekday', () => {
      const actual = findWeekdayIndex(
        [new Date('2000-01-01T00:00:00Z'), new Date('2000-01-02T00:00:00Z')],
        1, //Monday
        tzUtc
      )
      expect(actual).toBe(-1)
    })
    it('should not find last weekday', () => {
      const actual = lastWeekdayIndex(
        [
          new Date('2000-01-11T00:00:00Z'),
          new Date('2000-01-12T00:00:00Z'),
          new Date('2000-01-13T00:00:00Z'),
          new Date('2000-01-14T00:00:00Z')
        ],
        1, //Monday
        tzUtc
      )
      expect(actual).toBe(-1)
    })
  })
})
