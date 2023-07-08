import { isoWeekOfYear } from './isoWeekOfYear'
import { tzLocal } from './LocalTimezone'
import { I18nSettings, getLocaleInfo } from './LocaleInfo'
import { Timezone } from './Timezone'

/** @internal  */
const token =
  /d{1,4}|D{2,3}|m{1,4}|yy(?:yy)?|([HhMSt])\1?|F{1,3}|W{1,2}|[opZN]|"[^"]*"|'[^']*'|\[([^]*?)\]/g

/** @internal */
const getDayOfWeek = (date: Date, tz: Timezone): number => {
  let dow = tz.weekday(date)
  return dow === 0 ? 7 : dow
}

const flags: Record<
  string,
  (date: Date, tz: Timezone, localeInfo: I18nSettings) => any
> = {
  d: (date, tz) => tz.day(date),
  dd: (date, tz) => String(tz.day(date)).padStart(2, '0'),
  ddd: (date, tz, localeInfo) => localeInfo.weekday.short[tz.weekday(date)],
  dddd: (date, tz, localeInfo) => localeInfo.weekday.long[tz.weekday(date)],
  DD: (date, tz, localeInfo) => localeInfo.dayPlurals[tz.day(date) - 1],
  DDD: (date, tz, localeInfo) => localeInfo.weekday.narrow[tz.weekday(date)],
  m: (date, tz) => tz.monthIndex(date) + 1,
  mm: (date, tz) => String(tz.monthIndex(date) + 1).padStart(2, '0'),
  mmm: (date, tz, localeInfo) => localeInfo.month.short[tz.monthIndex(date)],
  mmmm: (date, tz, localeInfo) => localeInfo.month.long[tz.monthIndex(date)],
  yy: (date, tz) => String(tz.year(date)).slice(2),
  yyyy: (date, tz) => String(tz.year(date)).padStart(4, '0'),
  h: (date, tz) => tz.hours(date) % 12 || 12,
  hh: (date, tz) => String(tz.hours(date) % 12 || 12).padStart(2, '0'),
  H: (date, tz) => tz.hours(date),
  HH: (date, tz) => String(tz.hours(date)).padStart(2, '0'),
  M: (date, tz) => tz.minutes(date),
  MM: (date, tz) => String(tz.minutes(date)).padStart(2, '0'),
  S: (date, tz) => tz.seconds(date),
  SS: (date, tz) => String(tz.seconds(date)).padStart(2, '0'),
  F: (date, tz) => String(Math.floor(tz.milliseconds(date) / 100)),
  FF: (date, tz) =>
    String(Math.floor(tz.milliseconds(date) / 10)).padStart(2, '0'),
  FFF: (date, tz) => String(tz.milliseconds(date)).padStart(3, '0'),
  t: (date, tz, localeInfo) =>
    localeInfo.dayPeriod.narrow[tz.hours(date) < 12 ? 0 : 1],
  tt: (date, tz, localeInfo) =>
    localeInfo.dayPeriod.short[tz.hours(date) < 12 ? 0 : 1],
  ttt: (date, tz, localeInfo) =>
    localeInfo.dayPeriod.long[tz.hours(date) < 12 ? 0 : 1],
  Z: (_date, tz) => tz.name,
  o: (date, tz) =>
    (tz.offset(date) > 0 ? '-' : '+') +
    String(
      Math.floor(Math.abs(tz.offset(date)) / 60) * 100 +
        (Math.abs(tz.offset(date)) % 60)
    ).padStart(4, '0'),
  p: (date, tz) =>
    (tz.offset(date) > 0 ? '-' : '+') +
    String(Math.floor(Math.abs(tz.offset(date)) / 60)).padStart(2, '0') +
    ':' +
    String(Math.floor(Math.abs(tz.offset(date)) % 60)).padStart(2, '0'),
  W: date => isoWeekOfYear(date),
  WW: date => String(isoWeekOfYear(date)).padStart(2, '0'),
  N: (date, tz) => getDayOfWeek(date, tz)
}

/**
 * Format a date with a pattern.
 *
 * ```js
 * import { formatDate } from '@jetblack/date'
 *
 * const d = new Date("2000-01-01")
 * const s = formatDate(d, "d-mmm-yy")
 * console.log(s)
 * > 1-Jan-00
 * ```
 *
 * ### Pattern items
 *
 * | Value   | Description |
 * | ------- | ----------- |
 * | d       | Day of the month as digits; no leading zero for single-digit days. |
 * | dd      | Day of the month as digits; leading zero for single-digit days. |
 * | ddd     | Day of the week as the short representation (for en a three-letter abbreviation). |
 * | dddd    | Day of the week as its full name. |
 * | DD      | Day of the month with the plural suffix. |
 * | DDD     | Day of the week as the narrow representation. |
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
 * | t       | Narrow dayPeriod from locale. |
 * | tt      | Short dayPeriod from locale. |
 * | ttt     | Long dayPeriod from locale. |
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
  locale: I18nSettings | string | undefined = undefined
) {
  const localeInfo = getLocaleInfo(locale)

  return pattern.replace(token, match => {
    if (match in flags) {
      return flags[match](date, tz, localeInfo)
    }
    return match.slice(1, match.length - 1)
  })
}

/**
 * @deprecated Use {@link formatDate} instead.
 */
export const dateFormat = formatDate
