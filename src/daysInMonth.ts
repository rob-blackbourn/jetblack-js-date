import { isLeapYear } from './isLeapYear'

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const daysInMonth = (year: number, monthIndex: number): number =>
  isLeapYear(year) && monthIndex === 1 ? 29 : MONTH_DAYS[monthIndex]
