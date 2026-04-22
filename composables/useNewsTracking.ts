export interface Tracker {
  markViewed: (id: number) => void
  isViewed: (id: number) => boolean
  viewedCount: () => number
  getViewedIds: () => number[]
  reset: () => void
}

export function createTracker(): Tracker {
  const viewed = new Set<number>()

  return {
    markViewed: (id) => viewed.add(id),
    isViewed: (id) => viewed.has(id),
    viewedCount: () => viewed.size,
    getViewedIds: () => Array.from(viewed),
    reset: () => viewed.clear(),
  }
}

export function isNewsInViewport(
  entry: IntersectionObserverEntry,
  viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0,
): boolean {
  if (!entry.isIntersecting) return false
  return entry.boundingClientRect.bottom <= viewportHeight
}

export function useNewsTracking(variant: Ref<'A' | 'B'>, sessionId: Ref<string>) {
  const tracker = createTracker()
  // useRuntimeConfig is only available in Nuxt context
  const ymId = typeof useRuntimeConfig !== 'undefined'
    ? Number(useRuntimeConfig().public.ymCounterId)
    : 0

  function onCardEnter(newsId: number) {
    if (tracker.isViewed(newsId)) return
    tracker.markViewed(newsId)

    if (ymId && typeof window !== 'undefined' && typeof (window as any).ym === 'function') {
      ;(window as any).ym(ymId, 'reachGoal', 'news_viewed', {
        id: newsId,
        variant: variant.value,
      })
    }

    $fetch('/api/track', {
      method: 'POST',
      body: { newsId, variant: variant.value, sessionId: sessionId.value },
    }).catch(() => {})
  }

  function setupObserver(el: HTMLElement, newsId: number): () => void {
    if (typeof IntersectionObserver === 'undefined') return () => {}

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (isNewsInViewport(entry)) {
            onCardEnter(newsId)
            observer.disconnect()
          }
        }
      },
      { threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }

  return { setupObserver, tracker, onCardEnter }
}
