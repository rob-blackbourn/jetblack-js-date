import {
  IANATimezone,
  dataToTimezoneOffset,
  minDataToTimezoneOffset,
  loadTimezone,
  loadTimezoneNames
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

  it('should load minified tzdata with dynamic import', async () => {
    const tzChicago = await loadTimezone('America/Chicago')
    const date = new Date('2000-01-01T00:00:00Z')
    expect(tzChicago.offset(date)).toBe(-360)
  })

  it('should load timezone names with dynamic import', async () => {
    const names = await loadTimezoneNames()
    expect(names.length > 0).toBeTruthy()
  })
})
