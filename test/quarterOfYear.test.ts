import { quarterOfYear, tzUtc } from '../src'

describe('quarterOfYear', () => {
  it('should find quarter', () => {
    expect(quarterOfYear(new Date('2000-01-01'), tzUtc)).toBe(1)
    expect(quarterOfYear(new Date('2000-02-01'), tzUtc)).toBe(1)
    expect(quarterOfYear(new Date('2000-03-01'), tzUtc)).toBe(1)
    expect(quarterOfYear(new Date('2000-04-01'), tzUtc)).toBe(2)
    expect(quarterOfYear(new Date('2000-05-01'), tzUtc)).toBe(2)
    expect(quarterOfYear(new Date('2000-06-01'), tzUtc)).toBe(2)
    expect(quarterOfYear(new Date('2000-07-01'), tzUtc)).toBe(3)
    expect(quarterOfYear(new Date('2000-08-01'), tzUtc)).toBe(3)
    expect(quarterOfYear(new Date('2000-09-01'), tzUtc)).toBe(3)
    expect(quarterOfYear(new Date('2000-10-01'), tzUtc)).toBe(4)
    expect(quarterOfYear(new Date('2000-11-01'), tzUtc)).toBe(4)
    expect(quarterOfYear(new Date('2000-12-01'), tzUtc)).toBe(4)
  })
})
