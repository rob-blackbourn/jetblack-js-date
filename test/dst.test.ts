import { IANATimezone, addMinutes, dataToTimezoneOffset } from '../src'
import londonTzData from '@jetblack/tzdata/dist/latest/Europe/London.json'

describe('dst', () => {
  const tzLondon = new IANATimezone(
    'Europe/Brussels',
    londonTzData.map(dataToTimezoneOffset)
  )

  it('should spring forward', () => {
    // London clocks got forward: Sunday, March 26, 1:00 am.
    const almostMidnight = tzLondon.makeDate(2000, 2, 25, 23, 59, 59)
    expect(tzLondon.toISOString(almostMidnight)).toBe(
      '2000-03-25T23:59:59+00:00'
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 59, tzLondon))).toBe(
      '2000-03-26T00:58:59+00:00' // no change till 1am.
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 61, tzLondon))).toBe(
      '2000-03-26T02:00:59+01:00' // skip 1am for 2am+01:00
    )
  })

  it('should fall back', () => {
    // London clocks go back: Sunday, October 29, 2:00 am
    const almostMidnight = tzLondon.makeDate(2000, 9, 28, 23, 59, 0)
    expect(tzLondon.toISOString(almostMidnight)).toBe(
      '2000-10-28T23:59:00+01:00'
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 1, tzLondon))).toBe(
      '2000-10-29T00:00:00+01:00'
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 61, tzLondon))).toBe(
      '2000-10-29T02:00:00+01:00'
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 90, tzLondon))).toBe(
      '2000-10-29T02:29:00+01:00'
    )
    expect(
      tzLondon.toISOString(addMinutes(almostMidnight, 2 * 60 + 1, tzLondon))
    ).toBe('2000-10-29T02:00:00+00:00')
  })
})
