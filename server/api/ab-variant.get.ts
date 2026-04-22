import { assignVariant } from '../utils/ab'
import { randomUUID } from 'uncrypto'

export default defineEventHandler(() => {
  const variant = assignVariant()
  const sessionId = randomUUID()

  return { variant, sessionId }
})
