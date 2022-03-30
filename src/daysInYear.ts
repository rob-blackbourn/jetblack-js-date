import { isLeapYear } from './isLeapYear'

export const daysInYear = (year: number): number =>
  isLeapYear(year) ? 366 : 365
