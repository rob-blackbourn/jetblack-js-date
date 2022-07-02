/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 * and Rob Blackbourn.
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to masks.default.
 */

import { addDays } from './addDays'
import { isoWeekOfYear } from './isoWeekOfYear'
import { tzLocal } from './LocalTimezone'
import { Timezone } from './Timezone'
import { tzUtc } from './UTCTimezone'

// Regexes and supporting functions are cached through closure
const token =
  /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMSTt])\1?|F{1,3}|W{1,2}|[opZN]|"[^"]*"|'[^']*'/g

export let defaultMasks: { [name: string]: string } = {
  default: 'ddd mmm dd yyyy HH:MM:SS',
  shortDate: 'm/d/yy',
  paddedShortDate: 'mm/dd/yyyy',
  mediumDate: 'mmm d, yyyy',
  longDate: 'mmmm d, yyyy',
  fullDate: 'dddd, mmmm d, yyyy',
  shortTime: 'h:MM TT',
  mediumTime: 'h:MM:SS TT',
  longTime: 'h:MM:SS TT Z',
  isoDate: 'yyyy-mm-dd',
  isoTime: 'HH:MM:SS',
  isoDateTime: "yyyy-mm-dd'T'HH:MM:SSo",
  expiresHeaderFormat: 'ddd, dd mmm yyyy HH:MM:SS Z'
}

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 *
 * @param date A date
 * @returns The ISO week day
 */
const getDayOfWeek = (date: Date, tz: Timezone): number => {
  let dow = tz.weekday(date)
  return dow === 0 ? 7 : dow
}

interface LocaleNames {
  weekday: { short: Array<string | undefined>; long: Array<string | undefined> }
  month: { short: Array<string | undefined>; long: Array<string | undefined> }
}
type LocalNameType = 'weekday' | 'month'
type LocalNameStyle = 'short' | 'long'
const localeCache: { [locale: string]: LocaleNames } = {}

function getLocaleName(
  index: number,
  type: LocalNameType,
  style: LocalNameStyle,
  locale: string | undefined
): string {
  if (!locale) {
    locale = Intl.DateTimeFormat().resolvedOptions().locale
  }

  if (!(locale in localeCache)) {
    localeCache[locale] = {
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
  let localeName = localeCache[locale][type][style][index]
  if (!localeName) {
    const monthIndex = type === 'month' ? index : 0
    const day = type === 'weekday' ? 1 + index : 1
    const date = tzUtc.makeDate(1967, monthIndex, day)
    localeName = date.toLocaleString(locale, { [type]: style })
    localeCache[locale][type][style][index] = localeName
  }

  return localeName
}

/**
 * Get day name
 * Yesterday, Today, Tomorrow if the date lies within, else fallback to Monday - Sunday
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

export interface DateFormatOptions {
  masks?: { [name: string]: string }
  locale?: string
}

export function dateFormat(
  date: Date,
  mask: string,
  options: DateFormatOptions,
  tz: Timezone = tzLocal
) {
  const { masks = defaultMasks, locale } = options

  const pattern = String(masks[mask] || mask)

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
