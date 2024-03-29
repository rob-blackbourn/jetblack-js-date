import { addSeconds } from '../src'

describe('addSeconds', () => {
  it('should add seconds', () => {
    const actual = addSeconds(new Date('2000-01-01T00:00:00Z'), 1)
    const expected = new Date('2000-01-01T00:00:01Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should subtract seconds', () => {
    const actual = addSeconds(new Date('2000-01-01T00:00:00Z'), -1)
    const expected = new Date('1999-12-31T23:59:59Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
