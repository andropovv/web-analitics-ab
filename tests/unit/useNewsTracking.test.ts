import { describe, it, expect } from 'vitest'
import { createTracker, isNewsInViewport } from '../../composables/useNewsTracking'

describe('createTracker', () => {
  it('starts with zero viewed count', () => {
    const tracker = createTracker()
    expect(tracker.viewedCount()).toBe(0)
  })

  it('marks a news item as viewed', () => {
    const tracker = createTracker()
    tracker.markViewed(1)
    expect(tracker.viewedCount()).toBe(1)
    expect(tracker.isViewed(1)).toBe(true)
  })

  it('does not double-count the same item', () => {
    const tracker = createTracker()
    tracker.markViewed(1)
    tracker.markViewed(1)
    expect(tracker.viewedCount()).toBe(1)
  })

  it('tracks multiple unique items', () => {
    const tracker = createTracker()
    tracker.markViewed(1)
    tracker.markViewed(2)
    tracker.markViewed(3)
    expect(tracker.viewedCount()).toBe(3)
  })

  it('returns all viewed ids', () => {
    const tracker = createTracker()
    tracker.markViewed(10)
    tracker.markViewed(20)
    const ids = tracker.getViewedIds()
    expect(ids).toContain(10)
    expect(ids).toContain(20)
    expect(ids).toHaveLength(2)
  })

  it('resets correctly', () => {
    const tracker = createTracker()
    tracker.markViewed(1)
    tracker.markViewed(2)
    tracker.reset()
    expect(tracker.viewedCount()).toBe(0)
    expect(tracker.isViewed(1)).toBe(false)
  })
})

describe('isNewsInViewport', () => {
  const makeEntry = (bottom: number, isIntersecting: boolean) =>
    ({ boundingClientRect: { bottom }, isIntersecting }) as unknown as IntersectionObserverEntry

  it('returns true when card bottom is within height 768', () => {
    expect(isNewsInViewport(makeEntry(500, true), 768)).toBe(true)
  })

  it('returns false when card bottom is below viewport', () => {
    expect(isNewsInViewport(makeEntry(1200, true), 768)).toBe(false)
  })

  it('returns false when entry is not intersecting', () => {
    expect(isNewsInViewport(makeEntry(300, false), 768)).toBe(false)
  })

  it('returns true at exact viewport edge', () => {
    expect(isNewsInViewport(makeEntry(600, true), 600)).toBe(true)
  })
})
