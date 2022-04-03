export function dateEquals(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() === rhs.getTime()
}

export function dateNotEquals(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() !== rhs.getTime()
}

export function dateBefore(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() < rhs.getTime()
}

export function dateOnOrBefore(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() <= rhs.getTime()
}

export function dateOnOrAfter(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() >= rhs.getTime()
}

export function dateAfter(lhs: Date, rhs: Date): boolean {
  return lhs.getTime() > rhs.getTime()
}

export function compareDateAsc(a: Date, b: Date): number {
  return Math.sign(b.getTime() - a.getTime())
}

export function compareDateDesc(a: Date, b: Date): number {
  return Math.sign(a.getTime() - b.getTime())
}
