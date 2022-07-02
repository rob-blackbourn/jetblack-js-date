import { dateFormat, tzUtc, tzLocal } from '../src'

describe('dateFormat', () => {
  it('should pass smoke test', () => {
    const d = new Date('2022-07-02T06:39:15.291Z')
    const s = dateFormat(d, 'ddd, dd mmm yyyy HH:MM:ss Z', tzUtc)
    expect(s).toBe('Sat, 02 Jul 2022 06:39:15 UTC')
  })
})
