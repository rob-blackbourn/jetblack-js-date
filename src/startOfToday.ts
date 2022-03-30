import { Timezone, tzLocal } from './timezone'
import { startOfDay } from './startOfDay'

export const startOfToday = (tz: Timezone = tzLocal): Date =>
  startOfDay(new Date(), tz)
