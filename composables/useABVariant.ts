import type { ABVariant } from '~/server/utils/ab'

interface ABVariantResponse {
  variant: ABVariant
  sessionId: string
}

export function useABVariant() {
  const variant = useState<ABVariant>('ab_variant', () => 'A')
  const sessionId = useState<string>('ab_session', () => '')

  async function init() {
    const data = await $fetch<ABVariantResponse>('/api/ab-variant')
    variant.value = data.variant
    sessionId.value = data.sessionId
  }

  return { variant, sessionId, init }
}
