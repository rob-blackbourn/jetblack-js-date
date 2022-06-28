import { isoWeekDate } from '../src'

describe('isoWeekDate', () => {
  it('should handle contemporary dates', () => {
    const samples = [
      { date: '1977-01-01T00:00:00Z', expected: [1976, 53, 6] },
      { date: '1977-01-02T00:00:00Z', expected: [1976, 53, 7] },
      { date: '1977-12-31T00:00:00Z', expected: [1977, 52, 6] },
      { date: '1978-01-01T00:00:00Z', expected: [1977, 52, 7] },
      { date: '1978-01-02T00:00:00Z', expected: [1978, 1, 1] },
      { date: '1978-12-31T00:00:00Z', expected: [1978, 52, 7] },
      { date: '1979-01-01T00:00:00Z', expected: [1979, 1, 1] },
      { date: '1979-12-30T00:00:00Z', expected: [1979, 52, 7] },
      { date: '1979-12-31T00:00:00Z', expected: [1980, 1, 1] },
      { date: '1980-01-01T00:00:00Z', expected: [1980, 1, 2] },
      { date: '1980-12-28T00:00:00Z', expected: [1980, 52, 7] },
      { date: '1980-12-29T00:00:00Z', expected: [1981, 1, 1] },
      { date: '1980-12-30T00:00:00Z', expected: [1981, 1, 2] },
      { date: '1980-12-31T00:00:00Z', expected: [1981, 1, 3] },
      { date: '1981-01-01T00:00:00Z', expected: [1981, 1, 4] },
      { date: '1981-12-31T00:00:00Z', expected: [1981, 53, 4] },
      { date: '1982-01-01T00:00:00Z', expected: [1981, 53, 5] },
      { date: '1982-01-02T00:00:00Z', expected: [1981, 53, 6] },
      { date: '1982-01-03T00:00:00Z', expected: [1981, 53, 7] }
    ]
    samples.forEach(({ date, expected }) => {
      expect(isoWeekDate(new Date(date))).toStrictEqual(expected)
    })
  })
})
