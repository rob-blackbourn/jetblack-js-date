import { roundDate, tzUtc } from '../src'

describe('roundDate', () => {
  it('should round down', () => {
    const date = new Date('2020-01-01T11:59:59.999Z')
    const expected = new Date('2020-01-01T00:00:00Z')
    expect(roundDate(date).getTime()).toBe(expected.getTime())
  })

  it('should round up', () => {
    const date = new Date('2020-01-01T12:00:00Z')
    const expected = new Date('2020-01-02T00:00:00Z')
    expect(roundDate(date).getTime()).toBe(expected.getTime())
  })

  it('should not change', () => {
    const date = new Date('2020-01-01T00:00:00Z')
    const expected = new Date('2020-01-01T00:00:00Z')
    expect(roundDate(date).getTime()).toBe(expected.getTime())
  })
})
