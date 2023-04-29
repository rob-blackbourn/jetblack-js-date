import { range } from './utils'

export interface DayPlurals {
  zero: string
  one: string
  two: string
  few: string
  many: string
  other: string
}
export type DayPeriods = [string, string]
export type NameStyle = 'narrow' | 'short' | 'long'
export interface I18nSettings {
  dayPeriod: Record<NameStyle, DayPeriods>
  weekday: Record<NameStyle, Days>
  month: Record<NameStyle, Months>
  dayPlurals: string[] // 31 days starting at 0.
}

export type I18nSettingsOptional = Partial<I18nSettings>
export type Days = [string, string, string, string, string, string, string]
export type Months = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
]

function getLocaleName(
  index: number,
  type: 'weekday' | 'month',
  style: NameStyle,
  locale: string
): string {
  const monthIndex = type === 'month' ? index : 0
  const day = type === 'weekday' ? 1 + index : 1
  const date = new Date(1967, monthIndex, day)
  return date.toLocaleString(locale, { [type]: style })
}

function getLocaleNames(
  type: 'weekday' | 'month',
  style: NameStyle,
  locale: string
): string[] {
  return Array.from(type === 'weekday' ? range(0, 7) : range(0, 12)).map(i =>
    getLocaleName(i, type, style, locale)
  )
}

const defaultNumberPlurals: DayPlurals = {
  zero: 'th',
  one: 'st',
  two: 'nd',
  few: 'rd',
  many: 'rd',
  other: 'th'
}

function getDayPlurals(
  locale: string,
  dayPlurals: DayPlurals = defaultNumberPlurals
): string[] {
  const ordinalRules = new Intl.PluralRules(locale, { type: 'ordinal' })
  function ordinal(number: number): string {
    const category = ordinalRules.select(number)
    const suffix = dayPlurals[category]
    return new String(number) + suffix
  }

  const plurals = new Array(31).fill('').map((_, index) => ordinal(index + 1))

  return plurals
}

function getDayPeriods(
  locale: string,
  style: 'narrow' | 'short' | 'long'
): DayPeriods {
  let options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    hour12: true
  }
  // if (!locale.startsWith('en')) {
  //   options = { ...options, dayPeriod: style }
  // }
  const morning = new Intl.DateTimeFormat(locale, options)
    .formatToParts(new Date(1970, 0, 1, 1))
    .filter(x => x.type === 'dayPeriod')
    .map(x => x.value)
  const afternoon = new Intl.DateTimeFormat(locale, options)
    .formatToParts(new Date(1970, 0, 1, 13))
    .filter(x => x.type === 'dayPeriod')
    .map(x => x.value)
  return [
    morning.length === 1 ? morning[0] : 'AM',
    afternoon.length === 1 ? afternoon[0] : 'AM'
  ]
}

export class LocaleInfo implements I18nSettings {
  locale: string
  dayPeriod: Record<NameStyle, DayPeriods>
  weekday: Record<NameStyle, Days>
  month: Record<NameStyle, Months>
  dayPlurals: string[]

  constructor(locale?: string, dayPlurals: DayPlurals = defaultNumberPlurals) {
    this.locale = locale || Intl.DateTimeFormat().resolvedOptions().locale
    this.dayPeriod = {
      narrow: getDayPeriods(this.locale, 'narrow'),
      short: getDayPeriods(this.locale, 'short'),
      long: getDayPeriods(this.locale, 'long')
    }
    this.weekday = {
      narrow: getLocaleNames('weekday', 'narrow', this.locale) as Days,
      short: getLocaleNames('weekday', 'short', this.locale) as Days,
      long: getLocaleNames('weekday', 'long', this.locale) as Days
    }
    this.month = {
      narrow: getLocaleNames('month', 'narrow', this.locale) as Months,
      short: getLocaleNames('month', 'short', this.locale) as Months,
      long: getLocaleNames('month', 'long', this.locale) as Months
    }
    this.dayPlurals = getDayPlurals(
      this.locale,
      dayPlurals || defaultNumberPlurals
    )
  }

  DoFn(dayOfMonth: number): string {
    throw new Error('Method not implemented.')
  }
}

const localeCache: { [locale: string]: LocaleInfo } = {}

export function getLocaleInfo(
  locale: LocaleInfo | string | undefined
): LocaleInfo {
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
