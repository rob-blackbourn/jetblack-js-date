import { addDays } from './addDays'
import { isoWeekOfYear } from './isoWeekOfYear'
import { tzLocal } from './LocalTimezone'
import { LocaleInfo, NameStyle } from './LocaleInfo'
import { Timezone } from './Timezone'

/** @internal  */
const token =
  /d{1,4}|D{2,4}|m{1,4}|yy(?:yy)?|([HhMSt])\1?|F{1,3}|W{1,2}|[opZN]|"[^"]*"|'[^']*'/g

/** @internal */
const getDayOfWeek = (date: Date, tz: Timezone): number => {
  let dow = tz.weekday(date)
  return dow === 0 ? 7 : dow
}

/** @internal  */
const localeCache: { [locale: string]: LocaleInfo } = {}

/** @internal  */
function getLocaleInfo(locale: LocaleInfo | string | undefined): LocaleInfo {
  if (locale === undefined) {
    locale = 'default'
  }
  if (typeof locale === 'string') {
    if (!(locale in localeCache)) {
      localeCache[locale] = new LocaleInfo(locale)
    }
    locale = localeCache[locale]
  }
  return locale
}

/**
 * Get day name:
 * Yesterday, Today, Tomorrow if the date lies within, else fallback to Monday - Sunday
 *
 * @internal
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

  if (
    tz.year(today) === y &&
    tz.monthIndex(today) === m &&
    tz.day(today) === d
  ) {
    return short ? 'Tdy' : 'Today'
  }

  const yesterday = addDays(today, -1, tz)
  if (
    tz.year(yesterday) === y &&
    tz.monthIndex(yesterday) === m &&
    tz.day(yesterday) === d
  ) {
    return short ? 'Ysd' : 'Yesterday'
  }

  const tomorrow = addDays(today, 1, tz)
  if (
    tz.year(tomorrow) === y &&
    tz.monthIndex(tomorrow) === m &&
    tz.day(tomorrow) === d
  ) {
    return short ? 'Tmw' : 'Tomorrow'
  }

  return dayName
}

const flags: Record<
  string,
  (date: Date, tz: Timezone, localeInfo: LocaleInfo) => any
> = {
  d: (date: Date, tz: Timezone, localeInfo: LocaleInfo) => tz.day(date),
  dd: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.day(date)).padStart(2, '0'),
  ddd: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    localeInfo.weekday.short[tz.weekday(date)],
  DD: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    localeInfo.dayPlurals[tz.day(date) - 1],
  DDD: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    getDayName({
      y: tz.year(date),
      m: tz.monthIndex(date),
      d: tz.day(date),
      tz: tz,
      dayName: localeInfo.weekday.short[tz.weekday(date)],
      short: true
    }),
  dddd: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    localeInfo.weekday.long[tz.weekday(date)],
  DDDD: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    getDayName({
      y: tz.year(date),
      m: tz.monthIndex(date),
      d: tz.day(date),
      tz: tz,
      dayName: localeInfo.weekday.long[tz.weekday(date)]
    }),
  m: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    tz.monthIndex(date) + 1,
  mm: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.monthIndex(date) + 1).padStart(2, '0'),
  mmm: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    localeInfo.month.short[tz.monthIndex(date)],
  mmmm: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    localeInfo.month.long[tz.monthIndex(date)],
  yy: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.year(date)).slice(2),
  yyyy: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.year(date)).padStart(4, '0'),
  h: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    tz.hours(date) % 12 || 12,
  hh: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.hours(date) % 12 || 12).padStart(2, '0'),
  H: (date: Date, tz: Timezone, localeInfo: LocaleInfo) => tz.hours(date),
  HH: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.hours(date)).padStart(2, '0'),
  M: (date: Date, tz: Timezone, localeInfo: LocaleInfo) => tz.minutes(date),
  MM: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.minutes(date)).padStart(2, '0'),
  S: (date: Date, tz: Timezone, localeInfo: LocaleInfo) => tz.seconds(date),
  SS: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.seconds(date)).padStart(2, '0'),
  F: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(Math.floor(tz.milliseconds(date) / 100)),
  FF: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(Math.floor(tz.milliseconds(date) / 10)).padStart(2, '0'),
  FFF: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(tz.milliseconds(date)).padStart(3, '0'),
  t: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    localeInfo.dayPeriod.narrow[tz.hours(date) < 12 ? 0 : 1],
  tt: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    localeInfo.dayPeriod.short[tz.hours(date) < 12 ? 0 : 1],
  ttt: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    localeInfo.dayPeriod.long[tz.hours(date) < 12 ? 0 : 1],
  Z: (date: Date, tz: Timezone, localeInfo: LocaleInfo) => tz.name,
  o: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    (tz.offset(date) > 0 ? '-' : '+') +
    String(
      Math.floor(Math.abs(tz.offset(date)) / 60) * 100 +
        (Math.abs(tz.offset(date)) % 60)
    ).padStart(4, '0'),
  p: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    (tz.offset(date) > 0 ? '-' : '+') +
    String(Math.floor(Math.abs(tz.offset(date)) / 60)).padStart(2, '0') +
    ':' +
    String(Math.floor(Math.abs(tz.offset(date)) % 60)).padStart(2, '0'),
  W: (date: Date, tz: Timezone, localeInfo: LocaleInfo) => isoWeekOfYear(date),
  WW: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    String(isoWeekOfYear(date)).padStart(2, '0'),
  N: (date: Date, tz: Timezone, localeInfo: LocaleInfo) =>
    getDayOfWeek(date, tz)
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
export function formatDate(
  date: Date,
  pattern: string = "yyyy-mm-dd'T'HH:MM:SSo",
  tz: Timezone = tzLocal,
  locale: LocaleInfo | string | undefined = undefined
) {
  const localeInfo = getLocaleInfo(locale)

  return pattern.replace(token, match => {
    if (match in flags) {
      return flags[match](date, tz, localeInfo)
    }
    return match.slice(1, match.length - 1)
  })
}