import { Timezone, tzLocal } from './timezone'
import { endOfDay } from './endOfDay'

export const endOfToday = (tz: Timezone = tzLocal): Date =>
  endOfDay(new Date(), tz)
