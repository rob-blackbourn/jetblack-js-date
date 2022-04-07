/**
 * A request for date parts.
 */
export interface DatePartRequest {
  year?: boolean
  monthIndex?: boolean
  weekday?: boolean
  day?: boolean
  hours?: boolean
  minutes?: boolean
  seconds?: boolean
  milliseconds?: boolean
}

/**
 * A response for date parts.
 */
export interface DatePartResponse {
  year: number
  monthIndex: number
  weekday: number
  day: number
  hours: number
  minutes: number
  seconds: number
  milliseconds: number
}
