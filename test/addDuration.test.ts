import { Duration, addDuration, tzUtc } from '../src'

describe('addDuration', () => {
  it('should add duration', () => {
    const duration = new Duration('P1D')
    const actual = addDuration(
      new Date('2000-01-01T00:00:00Z'),
      duration,
      tzUtc
    )
    const expected = new Date('2000-01-02T00:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })

  it('should add a negative duration', () => {
    const duration = new Duration('-P1D')
    const actual = addDuration(
      new Date('2000-01-01T00:00:00Z'),
      duration,
      tzUtc
    )
    const expected = new Date('1999-12-31T00:00:00Z')
    expect(actual.toISOString()).toBe(expected.toISOString())
  })
})
