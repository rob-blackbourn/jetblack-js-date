import { Timezone, tzLocal } from './timezone'

export function easter(year: number, tz: Timezone = tzLocal): Date {
  // Note: Only true for Gregorian dates

  const y = year
  const g = y - Math.trunc(y / 19) * 19 + 1
  const c = Math.trunc(y / 100) + 1
  const x = Math.trunc((3 * c) / 4) - 12
  const z = Math.trunc((8 * c + 5) / 25) - 5
  const d = Math.trunc((5 * y) / 4) - x - 10
  const e1 = 11 * g + 20 + z - x
  let e = e1 - Math.trunc(e1 / 30) * 30

  // The value of 'e' may be negative. The case of year = 14250, e.g.,
  // produces values of g = 1, z = 40 and x = 95. The value of e1 is thus
  // -24, and the 'mod' code fails to return the proper positive result.
  // The following correction produces a positive value, mod 30, for 'e'.

  while (e < 0) {
    e += 30
  }
  if ((e === 25 && g > 11) || e === 24) {
    e += 1
  }

  let n = 44 - e

  if (n < 21) {
    n += 30
  }

  const dpn = d + n
  const n1 = dpn - Math.trunc(dpn / 7) * 7
  n = n + 7 - n1

  if (n > 31) {
    return tz.makeDate(year, 4, n - 31)
  } else {
    return tz.makeDate(year, 3, n)
  }
}
