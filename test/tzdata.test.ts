import {
  IANATimezone,
  dataToTimezoneOffset,
  minDataToTimezoneOffset
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import chicagoMinTzData from '@jetblack/tzdata/dist/latest/America/Chicago.min.json'

describe('tzdata', () => {
  it('should load tzdata', () => {
    const tzChicago = new IANATimezone(
      'America/Chicago',
      chicagoTzData.map(dataToTimezoneOffset)
    )
    const date = new Date('2000-01-01T00:00:00Z')
    expect(tzChicago.offset(date)).toBe(-360)
  })

  it('should load minified tzdata', () => {
    const tzChicago = new IANATimezone(
      'America/Chicago',
      chicagoMinTzData.map(minDataToTimezoneOffset)
    )
    const date = new Date('2000-01-01T00:00:00Z')
    expect(tzChicago.offset(date)).toBe(-360)
  })
})
