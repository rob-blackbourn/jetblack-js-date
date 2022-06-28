import { addNthDayOfWeek, tzUtc } from '../src'

/*
     June 2015
Su Mo Tu We Th Fr Sa
    1  2  3  4  5  6
 7  8  9 10 11 12 13
14 15 16 17 18 19 20
21 22 23 24 25 26 27
28 29 30
*/

describe('addNthDayOfWeek', () => {
  it('should not change as the first Monday is the same date', () => {
    const actual = addNthDayOfWeek(
      new Date('2015-06-01T00:00:00Z'), // Monday 1st June 2015
      1, // 1st Monday
      1, // Monday
      false, // Don't require the returned date to be different.
      tzUtc
    )
    const expected = new Date('2015-06-01T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should go to the next week when strictly different', () => {
    const actual = addNthDayOfWeek(
      new Date('2015-06-01T00:00:00Z'), // Monday 1st June 2015
      1, // 1st Monday
      1, // Monday
      true, // Require the returned date to be different.
      tzUtc
    )
    const expected = new Date('2015-06-08T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should choose the first Tuesday as the next date', () => {
    const actual = addNthDayOfWeek(
      new Date('2015-06-01T00:00:00Z'), // Monday 1st June 2015
      1, // 1st Tuesday
      2, // Tuesday
      false, // Don't require the returned date to be different.
      tzUtc
    )
    const expected = new Date('2015-06-02T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should choose the first Tuesday as the next date regardless of strict difference', () => {
    const actual = addNthDayOfWeek(
      new Date('2015-06-01T00:00:00Z'), // Monday 1st June 2015
      1, // 1st Tuesday
      2, // Tuesday
      true, // Require the returned date to be different.
      tzUtc
    )
    const expected = new Date('2015-06-02T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should choose the third Wednesday', () => {
    const actual = addNthDayOfWeek(
      new Date('2015-06-01T00:00:00Z'), // Monday 1st June 2015
      3, // third
      3, // Wednesday
      true, // Require the returned date to be different.
      tzUtc
    )
    const expected = new Date('2015-06-17T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should not change as the last Tuesday is the same date', () => {
    const actual = addNthDayOfWeek(
      new Date('2015-06-30T00:00:00Z'), // Monday 1st June 2015
      -1, // back one
      2, // Tuesday
      false, // Don't require the returned date to be different.
      tzUtc
    )
    const expected = new Date('2015-06-30T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should find the third Wednesday from the end of the month', () => {
    const actual = addNthDayOfWeek(
      new Date('2015-06-30T00:00:00Z'), // Monday 1st June 2015
      -3, // back three
      3, // Wednesday
      true, // Require the returned date to be different.
      tzUtc
    )
    const expected = new Date('2015-06-10T00:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
