import {
  IANATimezone,
  IntlTimezone,
  dataToTimezoneOffset,
  formatDate,
  tzUtc
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'
import buenosAiresTzData from '@jetblack/tzdata/dist/latest/Australia/Sydney.json'

describe('IntlTimezone', () => {
  const tzChicagoIANA = new IANATimezone(
    'America/Chicago',
    chicagoTzData.map(dataToTimezoneOffset)
  )
  const tzChicagoIntl = new IntlTimezone('America/Chicago')
  const tzSydneyIANA = new IANATimezone(
    'Australia/Sydney',
    buenosAiresTzData.map(dataToTimezoneOffset)
  )
  const tzSydneyIntl = new IntlTimezone('Australia/Sydney')

  it('should know offset in chicago', () => {
    const d = new Date('2024-12-31T23:59:59.999Z')
    const actual = tzChicagoIntl.offset(d)
    const expected = tzChicagoIANA.offset(d)
    expect(actual).toBe(expected)
  })

  it('should know dst in chicago', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzChicagoIntl.isDaylightSavings(d)
    const expected = tzChicagoIANA.isDaylightSavings(d)
    expect(actual).toBe(expected)
  })

  it('should know dst in Buenos Aires', () => {
    const d = new Date('2024-06-01T00:00:00.000Z')
    const actual = tzSydneyIntl.isDaylightSavings(d)
    const expected = tzSydneyIANA.isDaylightSavings(d)
    expect(actual).toBe(expected)
  })
})
