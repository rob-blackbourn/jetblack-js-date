import { addDays, tzUtc } from '../src'

describe('addDays', () => {
  it('should add days', () => {
    const actual = addDays(new Date('2000-01-01T00:00:00Z'), 40, tzUtc)
    const expected = new Date('2000-02-10T00:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should subtract days', () => {
    const actual = addDays(new Date('2000-01-01T00:00:00Z'), -40, tzUtc)
    const expected = new Date('1999-11-22T00:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
