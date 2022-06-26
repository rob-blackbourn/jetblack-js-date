import { quarterOfYear } from '../src'

describe('quarterOfYear', () => {
  it('should find quarter', () => {
    expect(quarterOfYear(new Date('2000-01-01'))).toBe(1)
    expect(quarterOfYear(new Date('2000-02-01'))).toBe(1)
    expect(quarterOfYear(new Date('2000-03-01'))).toBe(1)
    expect(quarterOfYear(new Date('2000-04-01'))).toBe(2)
    expect(quarterOfYear(new Date('2000-05-01'))).toBe(2)
    expect(quarterOfYear(new Date('2000-06-01'))).toBe(2)
    expect(quarterOfYear(new Date('2000-07-01'))).toBe(3)
    expect(quarterOfYear(new Date('2000-08-01'))).toBe(3)
    expect(quarterOfYear(new Date('2000-09-01'))).toBe(3)
    expect(quarterOfYear(new Date('2000-10-01'))).toBe(4)
    expect(quarterOfYear(new Date('2000-11-01'))).toBe(4)
    expect(quarterOfYear(new Date('2000-12-01'))).toBe(4)
  })
})
