import { addHours } from '../src'

describe('addHours', () => {
  it('should add hours', () => {
    const actual = addHours(new Date('2000-01-01T00:00:00Z'), 1)
    const expected = new Date('2000-01-01T01:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })

  it('should subtract hours', () => {
    const actual = addHours(new Date('2000-01-01T00:00:00Z'), -1)
    const expected = new Date('1999-12-31T23:00:00Z')
    expect(actual.getTime()).toBe(expected.getTime())
  })
})
