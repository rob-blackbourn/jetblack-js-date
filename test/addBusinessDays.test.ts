import { addBusinessDays, HolidayCalendar, calWeekends, tzUtc } from '../src'

describe('addBusinessDays', () => {
  describe('with the default weekend calendar', () => {
    it('should add business days within week', () => {
      // Mon 3 Jan 2000
      const actual = addBusinessDays(
        new Date('2000-01-03T00:00:00Z'),
        1,
        calWeekends,
        tzUtc
      )
      const expected = new Date('2000-01-04T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should subtract business days within week', () => {
      // Tue 4 Jan 2000
      const actual = addBusinessDays(
        new Date('2000-01-04T00:00:00Z'),
        -1,
        calWeekends,
        tzUtc
      )
      const expected = new Date('2000-01-03T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should add business days across a weekend', () => {
      // Fri 7 Jan 2000
      const actual = addBusinessDays(
        new Date('2000-01-07T00:00:00Z'),
        1,
        calWeekends,
        tzUtc
      )
      const expected = new Date('2000-01-10T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should subtract business days across a weekend', () => {
      // Mon 10 Jan 2000
      const actual = addBusinessDays(
        new Date('2000-01-10T00:00:00Z'),
        -1,
        calWeekends,
        tzUtc
      )
      const expected = new Date('2000-01-07T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })

  describe('with custom calendar', () => {
    const cal = new HolidayCalendar(
      'cal',
      [0, 6],
      [
        new Date('2015-01-01T00:00:00Z'),
        new Date('2015-04-03T00:00:00Z'),
        new Date('2015-04-06T00:00:00Z'),
        new Date('2015-05-01T00:00:00Z'),
        new Date('2015-12-25T00:00:00Z'),
        new Date('2015-12-26T00:00:00Z')
      ]
    )

    it('should add and skip New Years day', () => {
      const date = new Date('2015-01-01T00:00:00Z')
      const actual = addBusinessDays(date, 5, cal, tzUtc)
      const expected = new Date('2015-01-08T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should add but nothing to skip', () => {
      const date = new Date('2015-01-02T00:00:00Z')
      const actual = addBusinessDays(date, 4, cal, tzUtc)
      const expected = new Date('2015-01-08T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should add and skip', () => {
      const date = new Date('2014-12-29T00:00:00Z')
      const actual = addBusinessDays(date, 3, cal, tzUtc)
      const expected = new Date('2015-01-02T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should subtract and skip New Years day', () => {
      const date = new Date('2015-01-08T00:00:00Z')
      const actual = addBusinessDays(date, -5, cal, tzUtc)
      const expected = new Date('2014-12-31T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should subtract but nothing to skip', () => {
      const date = new Date('2015-01-08T00:00:00Z')
      const actual = addBusinessDays(date, -4, cal, tzUtc)
      const expected = new Date('2015-01-02T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })

    it('should subtract and skip', () => {
      const date = new Date('2015-01-02T00:00:00Z')
      const actual = addBusinessDays(date, -2, cal, tzUtc)
      const expected = new Date('2014-12-30T00:00:00Z')
      expect(actual.getTime()).toBe(expected.getTime())
    })
  })
})
