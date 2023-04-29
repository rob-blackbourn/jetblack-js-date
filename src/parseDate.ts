import { LocaleInfo, getLocaleInfo, NameStyle } from './LocaleInfo'
import { daysInMonth } from './daysInMonth'

interface DateInfo {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
  millisecond: number
  isAfternoon: number | null
  timezoneOffset: number
}

type ParseInfo = {
  field: keyof DateInfo | null
  pattern: string
  parse?: (value: string, localeInfo: LocaleInfo) => number | null
  requiredField?: string
}

const literalRegex = /\[([^]*?)\]/gm
const tokenRegex =
  /d{1,4}|m{1,4}|yy(?:yy)?|S{1,3}|F{1,3}|D{2,4}|ZZ|Z|([HhMS])\1?|t|"[^"]*"|'[^']*'/g

const fourDigitsPattern = '\\d{4}'
const threeDigitsPattern = '\\d{3}'
const twoDigitsPattern = '\\d{2}'
const oneOrTwoDigitsPattern = '\\d{1,2}'
const wordPattern = '[^\\s]+'

const escapeRegex = (text: string): string =>
  text.replace(/[|\\{()[^$+*?.-]/g, '\\$&')

function parseMonthName(
  name: string,
  style: NameStyle,
  localeInfo: LocaleInfo
): number | null {
  const lowerCaseNames = localeInfo.month[style].map(v => v.toLowerCase())
  const index = lowerCaseNames.indexOf(name.toLowerCase())
  return index === -1 ? null : index
}

function parseDecade(value: string): number {
  const decade = +value
  const currentYear = new Date().getFullYear()
  const currentDecade = currentYear % 100
  const currentCentury = currentYear - currentDecade
  const year = currentCentury + decade
  const yearsBetween = year - currentYear
  if (Math.abs(yearsBetween) <= 50) {
    return year
  } else if (yearsBetween > 0) {
    return year - 100
  } else {
    return year + 100
  }
}

const parseMonthIndex = (value: string): number => +value - 1

const emptyWordParseInfo: ParseInfo = { field: null, pattern: wordPattern }

const dayPeriodParseInfo: ParseInfo = {
  field: 'isAfternoon',
  pattern: wordPattern,
  parse: (value: string, localeInfo: LocaleInfo): number | null => {
    const val = value.toLowerCase()
    if (val === localeInfo.dayPeriod.narrow[0].toLowerCase()) {
      return 0
    } else if (val === localeInfo.dayPeriod.narrow[1].toLowerCase()) {
      return 1
    }
    return null
  }
}

const timezoneOffsetParseInfo: ParseInfo = {
  field: 'timezoneOffset',
  pattern: '[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?',
  parse: (value: string): number | null => {
    const parts = (value + '').match(/([+-]|\d\d)/gi)

    if (parts) {
      const minutes = +parts[1] * 60 + parseInt(parts[2], 10)
      return parts[0] === '+' ? minutes : -minutes
    }

    return 0
  }
}

const parseInfoMap: Record<string, ParseInfo> = {
  d: { field: 'day', pattern: oneOrTwoDigitsPattern },
  dd: { field: 'day', pattern: twoDigitsPattern },
  ddd: emptyWordParseInfo,
  dddd: emptyWordParseInfo,
  DD: {
    field: 'day',
    pattern: oneOrTwoDigitsPattern + wordPattern,
    parse: value => parseInt(value, 10)
  },
  DDD: emptyWordParseInfo,
  DDDD: emptyWordParseInfo,
  m: { field: 'month', pattern: oneOrTwoDigitsPattern, parse: parseMonthIndex },
  mm: { field: 'month', pattern: twoDigitsPattern, parse: parseMonthIndex },
  mmm: {
    field: 'month',
    pattern: wordPattern,
    parse: (value, localeInfo) => parseMonthName(value, 'short', localeInfo)
  },
  mmmm: {
    field: 'month',
    pattern: wordPattern,
    parse: (value, localeInfo) => parseMonthName(value, 'long', localeInfo)
  },
  yy: {
    field: 'year',
    pattern: twoDigitsPattern,
    parse: parseDecade
  },
  yyyy: { field: 'year', pattern: fourDigitsPattern },
  h: {
    field: 'hour',
    pattern: oneOrTwoDigitsPattern,
    requiredField: 'isAfternoon'
  },
  hh: {
    field: 'hour',
    pattern: twoDigitsPattern,
    requiredField: 'isAfternoon'
  },
  H: { field: 'hour', pattern: oneOrTwoDigitsPattern },
  HH: { field: 'hour', pattern: twoDigitsPattern },
  M: { field: 'minute', pattern: oneOrTwoDigitsPattern },
  MM: { field: 'minute', pattern: twoDigitsPattern },
  S: { field: 'second', pattern: oneOrTwoDigitsPattern },
  SS: { field: 'second', pattern: twoDigitsPattern },
  F: {
    field: 'millisecond',
    pattern: '\\d',
    parse: v => +v * 100
  },
  FF: { field: 'millisecond', pattern: twoDigitsPattern, parse: v => +v * 10 },
  FFF: { field: 'millisecond', pattern: threeDigitsPattern },
  t: dayPeriodParseInfo,
  ZZ: timezoneOffsetParseInfo,
  Z: timezoneOffsetParseInfo
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
    isAfternoon: null,
    timezoneOffset: 0
  }
  const formatParseInfos: ParseInfo[] = []
  const literals: string[] = []

  // Replace all the literals with @@@. Hopefully a string that won't exist in the format
  let formatWithoutLiterals = format.replace(literalRegex, ($0, $1) => {
    literals.push(escapeRegex($1))
    return '@@@'
  })
  const specifiedFields: { [field: string]: boolean } = {}
  const requiredFields: { [field: string]: boolean } = {}

  // Change every token that we find into the correct regex
  const formatRegexWithoutLiterals = escapeRegex(formatWithoutLiterals).replace(
    tokenRegex,
    $0 => {
      const parseInfo = parseInfoMap[$0]

      // Check if the person has specified the same field twice. This will lead to confusing results.
      if (parseInfo.field != null && parseInfo.field in specifiedFields) {
        throw new Error(
          `Invalid format. ${parseInfo.field} specified twice in format`
        )
      }

      if (parseInfo.field != null) {
        specifiedFields[parseInfo.field] = true
      }

      // Check if there are any required fields. For instance, 12 hour time requires AM/PM specified
      if (parseInfo.requiredField) {
        requiredFields[parseInfo.requiredField] = true
      }

      formatParseInfos.push(parseInfo)
      return '(' + parseInfo.pattern + ')'
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
    const { field, parse: parser } = formatParseInfos[i - 1]
    const value = parser ? parser(matches[i], localeInfo) : +matches[i]

    // If the parser can't make sense of the value, return null
    if (value == null) {
      return null
    }

    if (field != null) {
      dateInfo[field] = value
    }
  }

  if (dateInfo.isAfternoon === 1 && dateInfo.hour !== 12) {
    dateInfo.hour = +dateInfo.hour + 12
  } else if (dateInfo.isAfternoon === 0 && dateInfo.hour === 12) {
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
