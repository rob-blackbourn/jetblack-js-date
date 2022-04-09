import {
  isoWeekOfYear,
  tzUtc,
  IANATimezone,
  objectToTimezoneDelta
} from '../src'
import chicagoTzData from '@jetblack/tzdata/dist/latest/America/Chicago.json'

const tzChicago = new IANATimezone(
  'America/Chicago',
  chicagoTzData.map(objectToTimezoneDelta)
)

/*
   December 1976          January 1977
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
          1  2  3  4                     1
 5  6  7  8  9 10 11   2  3  4  5  6  7  8
12 13 14 15 16 17 18   9 10 11 12 13 14 15
19 20 21 22 23 24 25  16 17 18 19 20 21 22
26 27 28 29 30 31     23 24 25 26 27 28 29
                      30 31

   December 1977          January 1978    
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
             1  2  3   1  2  3  4  5  6  7
 4  5  6  7  8  9 10   8  9 10 11 12 13 14
11 12 13 14 15 16 17  15 16 17 18 19 20 21
18 19 20 21 22 23 24  22 23 24 25 26 27 28
25 26 27 28 29 30 31  29 30 31            

   December 1978          January 1979
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
                1  2      1  2  3  4  5  6
 3  4  5  6  7  8  9   7  8  9 10 11 12 13
10 11 12 13 14 15 16  14 15 16 17 18 19 20
17 18 19 20 21 22 23  21 22 23 24 25 26 27
24 25 26 27 28 29 30  28 29 30 31
31

   December 1979          January 1980
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
                   1         1  2  3  4  5
 2  3  4  5  6  7  8   6  7  8  9 10 11 12
 9 10 11 12 13 14 15  13 14 15 16 17 18 19
16 17 18 19 20 21 22  20 21 22 23 24 25 26
23 24 25 26 27 28 29  27 28 29 30 31
30 31

   December 1980          January 1981
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
    1  2  3  4  5  6               1  2  3
 7  8  9 10 11 12 13   4  5  6  7  8  9 10
14 15 16 17 18 19 20  11 12 13 14 15 16 17
21 22 23 24 25 26 27  18 19 20 21 22 23 24
28 29 30 31           25 26 27 28 29 30 31
                      
   December 1981          January 1982
Su Mo Tu We Th Fr Sa  Su Mo Tu We Th Fr Sa
       1  2  3  4  5                  1  2
 6  7  8  9 10 11 12   3  4  5  6  7  8  9
13 14 15 16 17 18 19  10 11 12 13 14 15 16
20 21 22 23 24 25 26  17 18 19 20 21 22 23
27 28 29 30 31        24 25 26 27 28 29 30
                      31
*/

describe('isoWeekOfYear', () => {
  describe('tzUtc', () => {
    it('returns ISO week 53 for Sat 1 Jan 1977 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1977, 0, 1), tzUtc)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 53 for Sat 2 Jan 1977 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1977, 0, 2), tzUtc)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 52 for Sat 31 Dec 1977 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1977, 11, 31), tzUtc)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 52 for Sun 1 Jan 1978 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1978, 0, 1), tzUtc)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 1 for Mon 2 Jan 1978 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1978, 0, 2), tzUtc)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 52 for Sun 31 Dec 1978 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1978, 11, 31), tzUtc)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 1 for Mon 1 Jan 1979 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1979, 0, 1), tzUtc)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 52 for Sun 30 Dec 1979 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1979, 11, 30), tzUtc)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 1 for Sun 31 Dec 1979 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1979, 11, 31), tzUtc)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 1 for Mon 1 Jan 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1980, 0, 1), tzUtc)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 52 for Sun 28 Dec 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1980, 11, 28), tzUtc)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 1 for Mon 29 Dec 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1980, 11, 29), tzUtc)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 1 for Tue 30 Dec 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1980, 11, 30), tzUtc)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 1 for Wed 31 Dec 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1980, 11, 31), tzUtc)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 1 for Thu 1 Jan 1981 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1981, 0, 1), tzUtc)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 53 for Thu 31 Dec 1981 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1981, 11, 31), tzUtc)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 53 for Fri 1 Jan 1982 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1982, 0, 1), tzUtc)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 53 for Sat 2 Jan 1982 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1982, 0, 2), tzUtc)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 53 for Sun 3 Jan 1982 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1982, 0, 3), tzUtc)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 1 for Mon 4 Jan 1982 in UTC', () => {
      const weekday = isoWeekOfYear(tzUtc.makeDate(1982, 0, 4), tzUtc)
      expect(weekday).toBe(1)
    })
  })

  describe('tzChicago', () => {
    it('returns ISO week 53 for Sat 1 Jan 1977 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1977, 0, 1), tzChicago)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 53 for Sat 2 Jan 1977 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1977, 0, 2), tzChicago)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 52 for Sat 31 Dec 1977 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1977, 11, 31), tzChicago)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 52 for Sun 1 Jan 1978 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1978, 0, 1), tzChicago)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 1 for Mon 2 Jan 1978 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1978, 0, 2), tzChicago)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 52 for Sun 31 Dec 1978 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1978, 11, 31), tzChicago)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 1 for Mon 1 Jan 1979 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1979, 0, 1), tzChicago)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 52 for Sun 30 Dec 1979 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1979, 11, 30), tzChicago)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 1 for Sun 31 Dec 1979 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1979, 11, 31), tzChicago)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 1 for Mon 1 Jan 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1980, 0, 1), tzChicago)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 52 for Sun 28 Dec 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1980, 11, 28), tzChicago)
      expect(weekday).toBe(52)
    })

    it('returns ISO week 1 for Mon 29 Dec 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1980, 11, 29), tzChicago)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 1 for Tue 30 Dec 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1980, 11, 30), tzChicago)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 1 for Wed 31 Dec 1980 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1980, 11, 31), tzChicago)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 1 for Thu 1 Jan 1981 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1981, 0, 1), tzChicago)
      expect(weekday).toBe(1)
    })

    it('returns ISO week 53 for Thu 31 Dec 1981 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1981, 11, 31), tzChicago)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 53 for Fri 1 Jan 1982 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1982, 0, 1), tzChicago)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 53 for Sat 2 Jan 1982 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1982, 0, 2), tzChicago)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 53 for Sun 3 Jan 1982 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1982, 0, 3), tzChicago)
      expect(weekday).toBe(53)
    })

    it('returns ISO week 1 for Mon 4 Jan 1982 in UTC', () => {
      const weekday = isoWeekOfYear(tzChicago.makeDate(1982, 0, 4), tzChicago)
      expect(weekday).toBe(1)
    })
  })
})
