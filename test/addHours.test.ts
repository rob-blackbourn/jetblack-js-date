import { addHours, tzUtc } from '../src'

describe('addHours', () => {
  it('should add hours', () => {
    const actual = addHours(new Date('2000-01-01T00:00:00Z'), 1, tzUtc)
    const expected = new Date('2000-01-01T01:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should subtract hours', () => {
    const actual = addHours(new Date('2000-01-01T00:00:00Z'), -1, tzUtc)
    const expected = new Date('1999-12-31T23:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
