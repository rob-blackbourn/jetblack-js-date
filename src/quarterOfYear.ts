export function quarterOfYear(date: Date): number {
  return 1 + Math.trunc(date.getMonth() / 4)
}
