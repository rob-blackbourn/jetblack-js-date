import { Duration, CustomTimezone, TimezoneDelta } from '../src'

const tzBrussels = new CustomTimezone('Europe/Brussels', [
  {
    utc: new Date('1999-03-28T00:59:59.00Z'),
    local: new Date('1999-03-28T01:59:59.00Z'),
    offset: new Duration('PT1H'),
    abbr: 'CET',
    isDst: false
  },
  {
    utc: new Date('1999-03-28T01:00:00.00Z'),
    local: new Date('1999-03-28T03:00:00.00Z'),
    offset: new Duration('PT2H'),
    abbr: 'CEST',
    isDst: true
  },
  {
    utc: new Date('1999-10-31T00:59:59.00Z'),
    local: new Date('1999-10-31T02:59:59.00Z'),
    offset: new Duration('PT2H'),
    abbr: 'CEST',
    isDst: true
  },
  {
    utc: new Date('1999-10-31T01:00:00.00Z'),
    local: new Date('1999-10-31T02:00:00.00Z'),
    offset: new Duration('PT1H'),
    abbr: 'CET',
    isDst: false
  },
  {
    utc: new Date('2000-03-26T00:59:59.00Z'),
    local: new Date('2000-03-26T01:59:59.00Z'),
    offset: new Duration('PT1H'),
    abbr: 'CET',
    isDst: false
  },
  {
    utc: new Date('2000-03-26T01:00:00.00Z'),
    local: new Date('2000-03-26T03:00:00.00Z'),
    offset: new Duration('-PT2H'),
    abbr: 'CEST',
    isDst: true
  },
  {
    utc: new Date('2000-10-29T00:59:59.00Z'),
    local: new Date('2000-10-29T02:59:59.00Z'),
    offset: new Duration('PT2H'),
    abbr: 'CEST',
    isDst: true
  },
  {
    utc: new Date('2000-10-29T01:00:00.00Z'),
    local: new Date('2000-10-29T02:00:00.00Z'),
    offset: new Duration('PT1H'),
    abbr: 'CET',
    isDst: false
  },
  {
    utc: new Date('2001-03-25T00:59:59.00Z'),
    local: new Date('2001-03-25T01:59:59.00Z'),
    offset: new Duration('PT1H'),
    abbr: 'CET',
    isDst: false
  },
  {
    utc: new Date('2001-03-25T01:00:00.00Z'),
    local: new Date('2001-03-25T03:00:00.00Z'),
    offset: new Duration('PT2H'),
    abbr: 'CEST',
    isDst: true
  },
  {
    utc: new Date('2001-10-28T00:59:59.00Z'),
    local: new Date('2001-10-28T02:59:59.00Z'),
    offset: new Duration('PT2H'),
    abbr: 'CEST',
    isDst: true
  },
  {
    utc: new Date('2001-10-28T01:00:00.00Z'),
    local: new Date('2001-10-28T02:00:00.00Z'),
    offset: new Duration('PT1H'),
    abbr: 'CET',
    isDst: false
  }
])

describe('timezone', () => {
  describe('basic', () => {
    it('should construct a date', () => {
      const actual = tzBrussels.makeDate(2000, 0, 1)
      const expected = new Date('1999-12-31T23:00:00Z')
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should destruct a date', () => {
      const expected = new Date('1999-12-31T23:00:00Z')
      const [year, monthIndex, day, hours, minutes, seconds, milliseconds] =
        tzBrussels.dateParts(new Date('1999-12-31T23:00:00Z'))
      expect(year).toBe(2000)
      expect(monthIndex).toBe(0)
      expect(day).toBe(1)
      expect(hours).toBe(0)
      expect(minutes).toBe(0)
      expect(seconds).toBe(0)
      expect(milliseconds).toBe(0)
    })

    it('should get the offset', () => {
      const date = tzBrussels.makeDate(2000, 0, 1)
      const actual = tzBrussels.offset(date)
      const expected = 60
      expect(actual).toBe(expected)
    })
  })
})
