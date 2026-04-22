import { describe, it, expect, vi, beforeEach } from 'vitest'

// Unit tests for A/B variant assignment logic
// Tests the pure functions extracted from the server handler

import { assignVariant, isValidVariant } from '../../server/utils/ab'

describe('assignVariant', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random')
  })

  it('returns A when random < 0.5', () => {
    vi.mocked(Math.random).mockReturnValue(0.3)
    expect(assignVariant()).toBe('A')
  })

  it('returns B when random >= 0.5', () => {
    vi.mocked(Math.random).mockReturnValue(0.7)
    expect(assignVariant()).toBe('B')
  })

  it('returns A when random is exactly 0', () => {
    vi.mocked(Math.random).mockReturnValue(0)
    expect(assignVariant()).toBe('A')
  })

  it('returns B when random is exactly 0.5', () => {
    vi.mocked(Math.random).mockReturnValue(0.5)
    expect(assignVariant()).toBe('B')
  })
})

describe('isValidVariant', () => {
  it('returns true for A', () => {
    expect(isValidVariant('A')).toBe(true)
  })

  it('returns true for B', () => {
    expect(isValidVariant('B')).toBe(true)
  })

  it('returns false for invalid strings', () => {
    expect(isValidVariant('C')).toBe(false)
    expect(isValidVariant('')).toBe(false)
    expect(isValidVariant('a')).toBe(false)
    expect(isValidVariant(null)).toBe(false)
    expect(isValidVariant(undefined)).toBe(false)
  })
})
