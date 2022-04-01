export function minDate(...dates: Date[]): Date {
  if (dates.length === 0) {
    throw new RangeError('no dates')
  }

  let smallest = dates[0]
  for (let i = 1; i < dates.length; ++i) {
    if (dates[i] < smallest) {
      smallest = dates[i]
    }
  }
  return smallest
}
