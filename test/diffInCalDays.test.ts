import { diffInCalDays, tzUtc } from '../src'

describe('diffInCalDays', () => {
  it('should difference dates', () => {
    const actual = diffInCalDays(
      new Date('2000-01-02T00:00:00Z'),
      new Date('2000-01-01T00:00:00Z'),
      tzUtc
    )
    const expected = 1
    expect(actual).toBe(expected)
  })
})
