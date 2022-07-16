import { endOfYear, leapSeconds, tzUtc } from '../src'

describe('leapSeconds', () => {
  it('should find two in 1972', () => {
    const startDate = new Date('1972-01-01T00:00:00Z')
    const endDate = endOfYear(startDate, tzUtc)
    const actual = leapSeconds(startDate, endDate)
    expect(actual).toBe(2)
  })

  it('should find none from 2000 to 2005', () => {
    const startDate = new Date('2000-01-01T00:00:00Z')
    const endDate = endOfYear(new Date('2005-01-01T00:00:00Z'), tzUtc)
    const actual = leapSeconds(startDate, endDate)
    expect(actual).toBe(0)
  })
})
