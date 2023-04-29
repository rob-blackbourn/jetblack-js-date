import { LocaleInfo, getLocaleInfo } from './LocaleInfo'
import { daysInMonth } from './daysInMonth'

type DateInfo = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
  isPm: number | null
  timezoneOffset: number
}

type ParseInfo = [
  keyof DateInfo | null,
  string,
  ((v: string, localeInfo: LocaleInfo) => number | null)?,
  string?
]

const fourDigits = '\\d{4}'
const literal = /\[([^]*?)\]/gm
const threeDigits = '\\d{3}'
const token =
  /d{1,4}|m{1,4}|yy(?:yy)?|S{1,3}|F{1,3}|D{2,4}|ZZ|Z|([HhMS])\1?|t|"[^"]*"|'[^']*'/g
const twoDigits = '\\d{2}'
const twoDigitsOptional = '\\d{1,2}'
const word = '[^\\s]+'

const regexEscape = (text: string): string =>
  text.replace(/[|\\{()[^$+*?.-]/g, '\\$&')

const monthUpdate =
  (
    type: 'month' | 'weekday' | 'dayPeriod',
    style: 'narrow' | 'short' | 'long'
  ) =>
  (value: string, localeInfo: LocaleInfo): number | null => {
    const lowerCaseArr = localeInfo[type][style].map(v => v.toLowerCase())
    const index = lowerCaseArr.indexOf(value.toLowerCase())
    if (index > -1) {
      return index
    }
    return null
  }

const monthParse = (value: string): number => +value - 1
const emptyDigits: ParseInfo = [null, twoDigitsOptional]
const emptyWord: ParseInfo = [null, word]
const dayPeriod: ParseInfo = [
  'isPm',
  word,
  (value: string, localeInfo: LocaleInfo): number | null => {
    const val = value.toLowerCase()
    if (val === localeInfo.dayPeriod.narrow[0].toLowerCase()) {
      return 0
    } else if (val === localeInfo.dayPeriod.narrow[1].toLowerCase()) {
      return 1
    }
    return null
  }
]

const timezoneOffset: ParseInfo = [
  'timezoneOffset',
  '[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?',
  (value: string): number | null => {
    const parts = (value + '').match(/([+-]|\d\d)/gi)

    if (parts) {
      const minutes = +parts[1] * 60 + parseInt(parts[2], 10)
      return parts[0] === '+' ? minutes : -minutes
    }

    return 0
  }
]
const parseFlags: Record<string, ParseInfo> = {
  d: ['day', twoDigitsOptional],
  dd: ['day', twoDigits],
  ddd: emptyWord,
  dddd: emptyWord,
  DD: ['day', twoDigitsOptional + word, (v: string): number => parseInt(v, 10)],
  DDD: emptyWord,
  DDDD: emptyWord,
  m: ['month', twoDigitsOptional, monthParse],
  mm: ['month', twoDigits, monthParse],
  mmm: ['month', word, monthUpdate('month', 'short')],
  mmmm: ['month', word, monthUpdate('month', 'long')],
  yy: [
    'year',
    twoDigits,
    (v: string): number => {
      const now = new Date()
      const cent = +('' + now.getFullYear()).substr(0, 2)
      return +('' + (+v > 68 ? cent - 1 : cent) + v)
    }
  ],
  yyyy: ['year', fourDigits],
  h: ['hour', twoDigitsOptional, undefined, 'isPm'],
  hh: ['hour', twoDigits, undefined, 'isPm'],
  H: ['hour', twoDigitsOptional],
  HH: ['hour', twoDigits],
  M: ['minute', twoDigitsOptional],
  MM: ['minute', twoDigits],
  S: ['second', twoDigitsOptional],
  SS: ['second', twoDigits],
  F: ['millisecond', '\\d', (v: string): number => +v * 100],
  FF: ['millisecond', twoDigits, (v: string): number => +v * 10],
  FFF: ['millisecond', threeDigits],
  t: dayPeriod,
  ZZ: timezoneOffset,
  Z: timezoneOffset
}

/**
 * Parse a date string into a Javascript Date object.
 *
 * @param dateStr Date string
 * @param format Date parse format
 * @param locale The locale
 * @returns The date, or null if parsing failed.
 */
export function parseDate(
  dateStr: string,
  format: string,
  locale: LocaleInfo | string | undefined = undefined
): Date | null {
  const localeInfo = getLocaleInfo(locale)

  // Default to the beginning of the year.
  const dateInfo: DateInfo = {
    year: new Date().getFullYear(),
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    isPm: null,
    timezoneOffset: 0
  }
  const parseInfo: ParseInfo[] = []
  const literals: string[] = []

  // Replace all the literals with @@@. Hopefully a string that won't exist in the format
  let formatWithoutLiterals = format.replace(literal, ($0, $1) => {
    literals.push(regexEscape($1))
    return '@@@'
  })
  const specifiedFields: { [field: string]: boolean } = {}
  const requiredFields: { [field: string]: boolean } = {}

  // Change every token that we find into the correct regex
  const formatRegexWithoutLiterals = regexEscape(formatWithoutLiterals).replace(
    token,
    $0 => {
      const info = parseFlags[$0]
      const [field, regex, , requiredField] = info

      // Check if the person has specified the same field twice. This will lead to confusing results.
      if (field != null && field in specifiedFields) {
        throw new Error(`Invalid format. ${field} specified twice in format`)
      }

      if (field != null) {
        specifiedFields[field] = true
      }

      // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified
      if (requiredField) {
        requiredFields[requiredField] = true
      }

      parseInfo.push(info)
      return '(' + regex + ')'
    }
  )

  // Check all the required fields are present
  Object.keys(requiredFields).forEach(field => {
    if (!specifiedFields[field]) {
      throw new Error(
        `Invalid format. ${field} is required in specified format`
      )
    }
  })

  // Add back all the literals after
  const formatRegex = formatRegexWithoutLiterals.replace(
    /@@@/g,
    () => literals.shift() as string
  )

  // Check if the date string matches the format. If it doesn't return null
  const matches = dateStr.match(new RegExp(formatRegex, 'i'))
  if (!matches || matches[0] !== matches.input) {
    return null
  }

  // For each match, call the parser function for that date part
  for (let i = 1; i < matches.length; ++i) {
    const [field, , parser] = parseInfo[i - 1]
    const value = parser ? parser(matches[i], localeInfo) : +matches[i]

    // If the parser can't make sense of the value, return null
    if (value == null) {
      return null
    }

    if (field != null) {
      dateInfo[field] = value
    }
  }

  if (dateInfo.isPm === 1 && dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12
  } else if (dateInfo.isPm === 0 && dateInfo.hour === 12) {
    dateInfo.hour = 0
  }

  if (dateInfo.month < 0 || dateInfo.month > 11) {
    return null
  }

  if (
    dateInfo.day < 1 ||
    dateInfo.day > daysInMonth(dateInfo.year, dateInfo.month)
  ) {
    return null
  }

  if (dateInfo.hour < 0 || dateInfo.hour >= 24) {
    return null
  }

  if (dateInfo.minute < 0 || dateInfo.minute >= 60) {
    return null
  }

  if (dateInfo.second < 0 || dateInfo.second >= 60) {
    return null
  }

  if (dateInfo.millisecond < 0 || dateInfo.millisecond >= 1000) {
    return null
  }

  return new Date(
    Date.UTC(
      dateInfo.year,
      dateInfo.month,
      dateInfo.day,
      dateInfo.hour,
      dateInfo.minute - dateInfo.timezoneOffset,
      dateInfo.second,
      dateInfo.millisecond
    )
  )
}
