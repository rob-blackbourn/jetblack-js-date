import { endOfDay } from './endOfDay'
import { Timezone, tzLocal } from './timezone'

export const endOfToday = (tz: Timezone = tzLocal): Date =>
  endOfDay(new Date(), tz)
