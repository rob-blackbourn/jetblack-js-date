import { isoWeekOfYear, tzUtc } from '../src'

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
  it('returns the ISO week of the given date', () => {
    const weekday = isoWeekOfYear(new Date('2005-01-02T00:00:00Z'), tzUtc)
    expect(weekday).toBe(53)
  })

  describe('edge cases', () => {
    it('returns the ISO week at 1 January 2016', () => {
      const weekday = isoWeekOfYear(new Date('2016-01-01T00:00:00Z'))
      expect(weekday).toBe(53)
    })

    it('returns the ISO week at 1 May 2016', () => {
      const weekday = isoWeekOfYear(new Date('2016-05-01T00:00:00Z'))
      expect(weekday).toBe(17)
    })

    it('returns the ISO week at 2 May 2016', () => {
      const weekday = isoWeekOfYear(new Date('2016-05-02T00:00:00Z'))
      expect(weekday).toBe(18)
    })

    it('returns the ISO week at 31 May 2016', () => {
      const weekday = isoWeekOfYear(new Date('2016-05-31T00:00:00Z'))
      expect(weekday).toBe(22)
    })
  })
})
