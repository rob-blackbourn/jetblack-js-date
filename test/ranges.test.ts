import { tzUtc, dayRange, weekRange, monthRange, yearRange } from '../src'

describe('range', () => {
  describe('dayRange', () => {
    it('should create a day range', () => {
      const actual = dayRange(
        new Date('2000-01-01T00:00:00Z'),
        new Date('2000-01-07T00:00:00Z'),
        1,
        tzUtc
      )
      const expected = [
        new Date('2000-01-01T00:00:00Z'),
        new Date('2000-01-02T00:00:00Z'),
        new Date('2000-01-03T00:00:00Z'),
        new Date('2000-01-04T00:00:00Z'),
        new Date('2000-01-05T00:00:00Z'),
        new Date('2000-01-06T00:00:00Z'),
        new Date('2000-01-07T00:00:00Z')
      ]
      actual.forEach((value, index) =>
        expect(value.toISOString()).toBe(expected[index].toISOString())
      )
    })

    it('should create a week range', () => {
      const actual = weekRange(
        new Date('2000-01-03T00:00:00Z'),
        new Date('2000-01-31T00:00:00Z'),
        1,
        tzUtc
      )
      const expected = [
        new Date('2000-01-03T00:00:00Z'),
        new Date('2000-01-10T00:00:00Z'),
        new Date('2000-01-17T00:00:00Z'),
        new Date('2000-01-24T00:00:00Z'),
        new Date('2000-01-31T00:00:00Z')
      ]
      actual.forEach((value, index) =>
        expect(value.toISOString()).toBe(expected[index].toISOString())
      )
    })

    it('should create a month range', () => {
      const actual = monthRange(
        new Date('2000-01-01T00:00:00Z'),
        new Date('2000-06-01T00:00:00Z'),
        1,
        tzUtc
      )
      const expected = [
        new Date('2000-01-01T00:00:00Z'),
        new Date('2000-02-01T00:00:00Z'),
        new Date('2000-03-01T00:00:00Z'),
        new Date('2000-04-01T00:00:00Z'),
        new Date('2000-05-01T00:00:00Z'),
        new Date('2000-06-01T00:00:00Z')
      ]
      actual.forEach((value, index) =>
        expect(value.toISOString()).toBe(expected[index].toISOString())
      )
    })

    it('should create a year range', () => {
      const actual = yearRange(
        new Date('2000-01-01T00:00:00Z'),
        new Date('2005-01-01T00:00:00Z'),
        1,
        tzUtc
      )
      const expected = [
        new Date('2000-01-01T00:00:00Z'),
        new Date('2001-01-01T00:00:00Z'),
        new Date('2002-01-01T00:00:00Z'),
        new Date('2003-01-01T00:00:00Z'),
        new Date('2004-01-01T00:00:00Z'),
        new Date('2005-01-01T00:00:00Z')
      ]
      actual.forEach((value, index) =>
        expect(value.toISOString()).toBe(expected[index].toISOString())
      )
    })
  })
})
