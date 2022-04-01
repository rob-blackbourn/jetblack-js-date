import { startOfDay } from './startOfDay'
import { Timezone, tzLocal } from './timezone'

export const startOfToday = (tz: Timezone = tzLocal): Date =>
  startOfDay(new Date(), tz)
