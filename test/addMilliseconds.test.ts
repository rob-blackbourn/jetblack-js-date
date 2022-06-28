import { addMilliseconds, tzUtc } from '../src'

describe('addMilliseconds', () => {
  it('should add milliseconds', () => {
    const actual = addMilliseconds(
      new Date('2000-01-01T00:00:00.000Z'),
      1,
      tzUtc
    )
    const expected = new Date('2000-01-01T00:00:00.001Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should subtract milliseconds', () => {
    const actual = addMilliseconds(
      new Date('2000-01-01T00:00:00.000Z'),
      -1,
      tzUtc
    )
    const expected = new Date('1999-12-31T23:59:59.999Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
