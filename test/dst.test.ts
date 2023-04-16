import { IANATimezone, addMinutes, dataToTimezoneOffset } from '../src'
import londonTzData from '@jetblack/tzdata/dist/latest/Europe/London.json'

describe('dst', () => {
  // London clocks got forward: Sunday, March 26, 1:00 am.
  // London clocks go back: Sunday, October 29, 2:00 am
  const tzLondon = new IANATimezone(
    'Europe/Brussels',
    londonTzData.map(dataToTimezoneOffset)
  )

  it('should know daylight savings', () => {
    expect(
      tzLondon.isDaylightSavings(new Date('2000-03-26T00:59:59Z'))
    ).toBeFalsy()
    expect(
      tzLondon.isDaylightSavings(new Date('2000-03-26T01:00:00Z'))
    ).toBeTruthy()
    expect(
      tzLondon.isDaylightSavings(new Date('2000-10-29T00:59:59Z'))
    ).toBeTruthy()
    expect(
      tzLondon.isDaylightSavings(new Date('2000-10-29T01:00:00Z'))
    ).toBeFalsy()
  })

  it('should know offset', () => {
    expect(tzLondon.offset(new Date('2000-03-26T00:59:59Z'))).toBe(0)
    expect(tzLondon.offset(new Date('2000-03-26T01:00:00Z'))).toBe(60)
    expect(tzLondon.offset(new Date('2000-10-29T00:59:59Z'))).toBe(60)
    expect(tzLondon.offset(new Date('2000-10-29T01:00:00Z'))).toBe(0)
  })

  it('should show time', () => {
    expect(tzLondon.toISOString(new Date('2000-03-26T00:00:00Z'))).toBe(
      '2000-03-26T00:00:00+00:00'
    )
    expect(tzLondon.toISOString(new Date('2000-03-27T00:00:00Z'))).toBe(
      '2000-03-27T01:00:00+01:00'
    )
    expect(tzLondon.toISOString(new Date('2000-10-29T00:00:00Z'))).toBe(
      '2000-10-29T01:00:00+01:00'
    )
    expect(tzLondon.toISOString(new Date('2000-10-30T00:00:00Z'))).toBe(
      '2000-10-30T00:00:00+00:00'
    )
  })

  it('should spring forward', () => {
    // London clocks got forward: Sunday, March 26, 1:00 am.
    const almostMidnight = tzLondon.makeDate(2000, 2, 25, 23, 59, 0)
    expect(tzLondon.toISOString(almostMidnight)).toBe(
      '2000-03-25T23:59:00+00:00'
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 60))).toBe(
      '2000-03-26T00:59:00+00:00' // no change till 1am.
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 60 + 1))).toBe(
      '2000-03-26T02:00:00+01:00' // skip 1am for 2am+01:00
    )
  })

  it('should fall back', () => {
    const almostMidnight = tzLondon.makeDate(2000, 9, 28, 23, 59, 0)
    expect(tzLondon.toISOString(almostMidnight)).toBe(
      '2000-10-28T23:59:00+01:00'
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 1))).toBe(
      '2000-10-29T00:00:00+01:00'
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 61))).toBe(
      '2000-10-29T01:00:00+01:00'
    )
    expect(tzLondon.toISOString(addMinutes(almostMidnight, 90))).toBe(
      '2000-10-29T01:29:00+01:00'
    )
  })
})
