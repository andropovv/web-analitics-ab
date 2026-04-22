export type ABVariant = 'A' | 'B'

export function assignVariant(): ABVariant {
  return Math.random() < 0.5 ? 'A' : 'B'
}

export function isValidVariant(value: unknown): value is ABVariant {
  return value === 'A' || value === 'B'
}
