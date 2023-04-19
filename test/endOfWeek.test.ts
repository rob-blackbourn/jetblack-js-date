import {
  IANATimezone,
  dataToTimezoneOffset,
  endOfWeek,
  tzLocal,
  tzUtc
} from '../src'
import tokyoTzData from '@jetblack/tzdata/dist/latest/Asia/Tokyo.json'

describe('endOfWeek', () => {
  describe('tzUtc', () => {
    it('should find the last moment of the week from Sunday', () => {
      const date = tzUtc.makeDate(2022, 6, 3) // Sun 3 July 2022
      const actual = endOfWeek(date, tzUtc)
      const expected = tzUtc.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should find the last moment of the week from Wednesday', () => {
      const date = tzUtc.makeDate(2022, 6, 6) // Wed 56 July 2022
      const actual = endOfWeek(date, tzUtc)
      const expected = tzUtc.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should find the last moment of the week from Saturday', () => {
      const date = tzUtc.makeDate(2022, 6, 9)
      const actual = endOfWeek(date, tzUtc)
      const expected = tzUtc.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
  })

  describe('tzLocal', () => {
    it('should find the last moment of the week from Sunday', () => {
      const date = tzLocal.makeDate(2022, 6, 3) // Sun 3 July 2022
      const actual = endOfWeek(date, tzLocal)
      const expected = tzLocal.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should find the last moment of the week from Wednesday', () => {
      const date = tzLocal.makeDate(2022, 6, 6) // Wed 56 July 2022
      const actual = endOfWeek(date, tzLocal)
      const expected = tzLocal.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should find the last moment of the week from Saturday', () => {
      const date = tzLocal.makeDate(2022, 6, 9)
      const actual = endOfWeek(date, tzLocal)
      const expected = tzLocal.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
  })

  describe('tzTokyo', () => {
    const tzTokyo = new IANATimezone(
      'Asia/Tokyo',
      tokyoTzData.map(dataToTimezoneOffset)
    )
    it('should find the last moment of the week from Sunday', () => {
      const date = tzTokyo.makeDate(2022, 6, 3) // Sun 3 July 2022
      const actual = endOfWeek(date, tzTokyo)
      const expected = tzTokyo.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should find the last moment of the week from Wednesday', () => {
      const date = tzTokyo.makeDate(2022, 6, 6) // Wed 56 July 2022
      const actual = endOfWeek(date, tzTokyo)
      const expected = tzTokyo.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })

    it('should find the last moment of the week from Saturday', () => {
      const date = tzTokyo.makeDate(2022, 6, 9)
      const actual = endOfWeek(date, tzTokyo)
      const expected = tzTokyo.makeDate(2022, 6, 9, 23, 59, 59, 999)
      expect(actual.toISOString()).toBe(expected.toISOString())
    })
  })
})
