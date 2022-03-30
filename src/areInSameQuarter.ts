export function areInSameQuarter(first: Date, second: Date): boolean {
  if (first.getTime() > second.getTime()) {
    return areInSameQuarter(second, first)
  }

  return (
    first.getTime() === second.getTime() ||
    (first.getFullYear() == second.getFullYear() &&
      second.getMonth() - first.getMonth() < 4 &&
      second.getMonth() % 3 > first.getMonth() % 3)
  )
}
