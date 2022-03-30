export const dateEquals = (lhs: Date, rhs: Date): boolean =>
  lhs.getTime() === rhs.getTime()

export const dateNotEquals = (lhs: Date, rhs: Date): boolean =>
  lhs.getTime() !== rhs.getTime()

export const dateBefore = (lhs: Date, rhs: Date): boolean =>
  lhs.getTime() < rhs.getTime()

export const dateOnOrBefore = (lhs: Date, rhs: Date): boolean =>
  lhs.getTime() <= rhs.getTime()

export const dateOnOrAfter = (lhs: Date, rhs: Date): boolean =>
  lhs.getTime() >= rhs.getTime()

export const dateAfter = (lhs: Date, rhs: Date): boolean =>
  lhs.getTime() > rhs.getTime()
