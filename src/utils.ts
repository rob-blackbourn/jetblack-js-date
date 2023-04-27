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

export function findLastIndex(
  array: any[],
  predicate: (element: any, index: number, array: any[]) => boolean
): number {
  for (let i = array.length - 1; i >= 0; --i) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }
  return -1
}

export function* range(
  start: number,
  stop?: number,
  step: number = 1
): Generator<number, void, unknown> {
  if (typeof stop == 'undefined') {
    stop = start
    start = 0
  }
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    yield i
  }
}
