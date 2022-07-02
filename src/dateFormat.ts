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

// Regexes and supporting functions are cached through closure
const token =
  /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g

export let masks: { [name: string]: string } = {
  default: 'ddd mmm dd yyyy HH:MM:ss',
  shortDate: 'm/d/yy',
  paddedShortDate: 'mm/dd/yyyy',
  mediumDate: 'mmm d, yyyy',
  longDate: 'mmmm d, yyyy',
  fullDate: 'dddd, mmmm d, yyyy',
  shortTime: 'h:MM TT',
  mediumTime: 'h:MM:ss TT',
  longTime: 'h:MM:ss TT Z',
  isoDate: 'yyyy-mm-dd',
  isoTime: 'HH:MM:ss',
  isoDateTime: "yyyy-mm-dd'T'HH:MM:sso",
  expiresHeaderFormat: 'ddd, dd mmm yyyy HH:MM:ss Z'
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

// Internationalization strings
export const i18n = {
  dayNames: [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  monthNames: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM']
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

export function dateFormat(
  date: Date,
  mask: string = 'default',
  tz: Timezone = tzLocal
) {
  mask = String(masks[mask] || mask)

  const d = () => tz.day(date)
  const D = () => tz.weekday(date)
  const m = () => tz.monthIndex(date)
  const y = () => tz.year(date)
  const H = () => tz.hours(date)
  const M = () => tz.minutes(date)
  const s = () => tz.seconds(date)
  const L = () => tz.milliseconds(date)
  const o = () => tz.offset(date)
  const W = () => isoWeekOfYear(date)
  const N = () => getDayOfWeek(date, tz)

  const flags: { [key: string]: () => any } = {
    d: () => d(),
    dd: () => String(d()).padStart(2, '0'),
    ddd: () => i18n.dayNames[D()],
    DDD: () =>
      getDayName({
        y: y(),
        m: m(),
        d: d(),
        tz: tz,
        dayName: i18n.dayNames[D()],
        short: true
      }),
    dddd: () => i18n.dayNames[D() + 7],
    DDDD: () =>
      getDayName({
        y: y(),
        m: m(),
        d: d(),
        tz: tz,
        dayName: i18n.dayNames[D() + 7]
      }),
    m: () => m() + 1,
    mm: () => String(m() + 1).padStart(2, '0'),
    mmm: () => i18n.monthNames[m()],
    mmmm: () => i18n.monthNames[m() + 12],
    yy: () => String(y()).slice(2),
    yyyy: () => String(y()).padStart(4, '0'),
    h: () => H() % 12 || 12,
    hh: () => String(H() % 12 || 12).padStart(2, '0'),
    H: () => H(),
    HH: () => String(H()).padStart(2, '0'),
    M: () => M(),
    MM: () => String(M()).padStart(2, '0'),
    s: () => s(),
    ss: () => String(s()).padStart(2, '0'),
    l: () => String(L()).padStart(3, '0'),
    L: () => String(Math.floor(L() / 10)).padStart(2, '0'),
    t: () => (H() < 12 ? i18n.timeNames[0] : i18n.timeNames[1]),
    tt: () => (H() < 12 ? i18n.timeNames[2] : i18n.timeNames[3]),
    T: () => (H() < 12 ? i18n.timeNames[4] : i18n.timeNames[5]),
    TT: () => (H() < 12 ? i18n.timeNames[6] : i18n.timeNames[7]),
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
    S: () =>
      ['th', 'st', 'nd', 'rd'][
        d() % 10 > 3 ? 0 : (((d() % 100) - (d() % 10) != 10 ? 1 : 0) * d()) % 10
      ],
    W: () => W(),
    WW: () => String(W()).padStart(2, '0'),
    N: () => N()
  }

  return mask.replace(token, match => {
    if (match in flags) {
      return flags[match]()
    }
    return match.slice(1, match.length - 1)
  })
}
