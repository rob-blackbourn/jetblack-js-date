/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 * and Rob Blackbourn.
 */

import { addDays } from './addDays'
import { isoWeekOfYear } from './isoWeekOfYear'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { tzUtc } from './UTCTimezone'

/** @internal  */
const token =
  /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMSTt])\1?|F{1,3}|W{1,2}|[opZN]|"[^"]*"|'[^']*'/g

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 *
 * @ internal
 *
 * @param date A date
 * @returns The ISO week day
 */
const getDayOfWeek = (date: Date, tz: Timezone): number => {
  let dow = tz.weekday(date)
  return dow === 0 ? 7 : dow
}

/** @internal  */
interface LocaleNames {
  weekday: { short: Array<string | undefined>; long: Array<string | undefined> }
  month: { short: Array<string | undefined>; long: Array<string | undefined> }
}
/** @internal  */
type LocaleOptionName = 'weekday' | 'month'
/** @internal  */
type LocaleOptionValue = 'short' | 'long'

/** @internal  */
const localeCache: { [locale: string]: LocaleNames } = {}

/** @internal  */
function getLocaleName(
  index: number,
  type: LocaleOptionName,
  style: LocaleOptionValue,
  locale: string | undefined
): string {
  const cacheName = !locale ? 'default' : locale

  if (!(cacheName in localeCache)) {
    localeCache[cacheName] = {
      weekday: {
        short: Array(7).fill(undefined),
        long: Array(7).fill(undefined)
      },
      month: {
        short: Array(7).fill(undefined),
        long: Array(7).fill(undefined)
      }
    }
  }
  let localeName = localeCache[cacheName][type][style][index]
  if (!localeName) {
    const monthIndex = type === 'month' ? index : 0
    const day = type === 'weekday' ? 1 + index : 1
    const date = tzUtc.makeDate(1967, monthIndex, day)
    localeName = date.toLocaleString(locale, { [type]: style })
    localeCache[cacheName][type][style][index] = localeName
  }

  return localeName
}

/**
 * Get day name
 * Yesterday, Today, Tomorrow if the date lies within, else fallback to Monday - Sunday
 *
 * @internal
 *
 * @param  {Object}
 * @return {String}
 */
const getDayName = ({
  y,
  m,
  d,
  tz,
  dayName,
  short = false
}: {
  y: number
  m: number
  d: number
  tz: Timezone
  dayName: string
  short?: boolean
}) => {
  const today = new Date()
  const yesterday = addDays(today, -1, tz)
  const tomorrow = addDays(today, 1, tz)
  const today_d = () => tz.day(today)
  const today_m = () => tz.monthIndex(today)
  const today_y = () => tz.year(today)
  const yesterday_d = () => tz.day(yesterday)
  const yesterday_m = () => tz.monthIndex(yesterday)
  const yesterday_y = () => tz.year(yesterday)
  const tomorrow_d = () => tz.day(tomorrow)
  const tomorrow_m = () => tz.monthIndex(tomorrow)
  const tomorrow_y = () => tz.year(tomorrow)

  if (today_y() === y && today_m() === m && today_d() === d) {
    return short ? 'Tdy' : 'Today'
  } else if (
    yesterday_y() === y &&
    yesterday_m() === m &&
    yesterday_d() === d
  ) {
    return short ? 'Ysd' : 'Yesterday'
  } else if (tomorrow_y() === y && tomorrow_m() === m && tomorrow_d() === d) {
    return short ? 'Tmw' : 'Tomorrow'
  }
  return dayName
}

/**
 * Format a date with a pattern.
 *
 * ```js
 * const d = new Date("2000-01-01")
 * const s = dateFormat(d, "d-mmm-yy")
 * console.log(s)
 * > 1-Jan-00
 * ```
 *
 * | Value   | Description |
 * | ------- | ----------- |
 * | d       | Day of the month as digits; no leading zero for single-digit days. |
 * | dd      | Day of the month as digits; leading zero for single-digit days. |
 * | ddd     | Day of the week as a three-letter abbreviation. |
 * | dddd    | Day of the week as its full name. |
 * | m       | Month as digits; no leading zero for single-digit months. |
 * | mm      | Month as digits; leading zero for single-digit months. |
 * | mmm     | Month as a three-letter abbreviation. |
 * | mmmm    | Month as its full name. |
 * | yy      | Year as last two digits; leading zero for years less than 10. |
 * | yyyy    | Year represented by four digits. |
 * | h       | Hours; no leading zero for single-digit hours (12-hour clock). |
 * | hh      | Hours; leading zero for single-digit hours (12-hour clock). |
 * | H       | Hours; no leading zero for single-digit hours (24-hour clock). |
 * | HH      | Hours; leading zero for single-digit hours (24-hour clock). |
 * | M       | Minutes; no leading zero for single-digit minutes. |
 * | MM      | Minutes; leading zero for single-digit minutes. |
 * | S       | Seconds; no leading zero for single-digit seconds. |
 * | SS      | Seconds; leading zero for single-digit seconds. |
 * | F       | Hundreds of milliseconds. |
 * | FF      | Tens of milliseconds with a leading zero for single-digit values. |
 * | FFF     | Milliseconds: zero padded. |
 * | t       | Lowercase, single-character time marker string: a or p. |
 * | tt      | Lowercase, two-character time marker string: am or pm. |
 * | T       | Uppercase, single-character time marker string: A or P. |
 * | TT      | Uppercase, two-character time marker string: AM or PM. |
 * | Z       | Timezone name. |
 * | o       | GMT/UTC timezone offset, e.g. -0500 or +0230. |
 * | '...' or "..." | Literal character sequence. Surrounding quotes are removed. |
 *
 * @category Formatting
 *
 * @param date A date.
 * @param pattern The format pattern.
 * @param tz An optional timezone. Defaults to the local timezone.
 * @param locale An optional locale. Defaults to the current browser locale.
 * @returns The formatted date string.
 */
export function dateFormat(
  date: Date,
  pattern: string = "yyyy-mm-dd'T'HH:MM:SSo",
  tz: Timezone = tzLocal,
  locale: string | undefined = undefined
) {
  const d = () => tz.day(date)
  const D = () => tz.weekday(date)
  const m = () => tz.monthIndex(date)
  const y = () => tz.year(date)
  const H = () => tz.hours(date)
  const M = () => tz.minutes(date)
  const S = () => tz.seconds(date)
  const F = () => tz.milliseconds(date)
  const o = () => tz.offset(date)
  const W = () => isoWeekOfYear(date)
  const N = () => getDayOfWeek(date, tz)

  const flags: { [key: string]: () => any } = {
    d: () => d(),
    dd: () => String(d()).padStart(2, '0'),
    ddd: () => getLocaleName(D(), 'weekday', 'short', locale),
    DDD: () =>
      getDayName({
        y: y(),
        m: m(),
        d: d(),
        tz: tz,
        dayName: getLocaleName(D(), 'weekday', 'short', locale),
        short: true
      }),
    dddd: () => getLocaleName(D(), 'weekday', 'long', locale),
    DDDD: () =>
      getDayName({
        y: y(),
        m: m(),
        d: d(),
        tz: tz,
        dayName: getLocaleName(D(), 'weekday', 'long', locale)
      }),
    m: () => m() + 1,
    mm: () => String(m() + 1).padStart(2, '0'),
    mmm: () => getLocaleName(m(), 'month', 'short', locale),
    mmmm: () => getLocaleName(m(), 'month', 'long', locale),
    yy: () => String(y()).slice(2),
    yyyy: () => String(y()).padStart(4, '0'),
    h: () => H() % 12 || 12,
    hh: () => String(H() % 12 || 12).padStart(2, '0'),
    H: () => H(),
    HH: () => String(H()).padStart(2, '0'),
    M: () => M(),
    MM: () => String(M()).padStart(2, '0'),
    S: () => S(),
    SS: () => String(S()).padStart(2, '0'),
    F: () => String(Math.floor(F() / 100)),
    FF: () => String(Math.floor(F() / 10)).padStart(2, '0'),
    FFF: () => String(F()).padStart(3, '0'),
    t: () => (H() < 12 ? 'a' : 'p'),
    tt: () => (H() < 12 ? 'am' : 'pm'),
    T: () => (H() < 12 ? 'A' : 'P'),
    TT: () => (H() < 12 ? 'AM' : 'PM'),
    Z: () => tz.name,
    o: () =>
      (o() > 0 ? '-' : '+') +
      String(
        Math.floor(Math.abs(o()) / 60) * 100 + (Math.abs(o()) % 60)
      ).padStart(4, '0'),
    p: () =>
      (o() > 0 ? '-' : '+') +
      String(Math.floor(Math.abs(o()) / 60)).padStart(2, '0') +
      ':' +
      String(Math.floor(Math.abs(o()) % 60)).padStart(2, '0'),
    W: () => W(),
    WW: () => String(W()).padStart(2, '0'),
    N: () => N()
  }

  return pattern.replace(token, match => {
    if (match in flags) {
      return flags[match]()
    }
    return match.slice(1, match.length - 1)
  })
}
