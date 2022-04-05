export function getClosestValues<T, I>(
  array: T[],
  value: I,
  compare: (a: I, b: T) => number
): [T, T] {
  let start = 0
  let end = array.length - 1

  while (start <= end) {
    let middle = Math.floor((start + end) / 2)
    const cmp = compare(value, array[middle])
    if (cmp === 0) {
      // found the key
      return [array[middle], array[middle]]
    } else if (cmp < 0) {
      // continue searching to the right
      start = middle + 1
    } else {
      // search searching to the left
      end = middle - 1
    }
  }
  // key wasn't found
  return [array[end], array[start]]
}

export function binarySearch<T, I>(
  array: T[],
  value: I,
  compare: (a: I, b: T) => number
): number {
  let start = 0
  let end = array.length - 1

  while (start <= end) {
    let middle = Math.floor((start + end) / 2)
    const cmp = compare(value, array[middle])
    if (cmp === 0) {
      // found the key
      return middle
    } else if (cmp < 0) {
      // continue searching to the right
      start = middle + 1
    } else {
      // search searching to the left
      end = middle - 1
    }
  }
  // key wasn't found
  return -1
}

export const padNumber = (value: number, maxLength: number): string =>
  String(value).padStart(maxLength, '0')
