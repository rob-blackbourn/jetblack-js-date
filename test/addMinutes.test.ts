import { addMinutes } from '../src'

describe('addMinutes', () => {
  it('should add minutes', () => {
    const actual = addMinutes(new Date('2000-01-01T00:00:00Z'), 1)
    const expected = new Date('2000-01-01T00:01:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should subtract minutes', () => {
    const actual = addMinutes(new Date('2000-01-01T00:00:00Z'), -1)
    const expected = new Date('1999-12-31T23:59:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
