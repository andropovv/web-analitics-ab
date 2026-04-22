import { describe, it, expect } from 'vitest'
import { filterNews, paginateNews, getNewsById } from '../../server/utils/news'
import { NEWS, type Category } from '../../data/news'

describe('filterNews', () => {
  it('returns all news when no category specified', () => {
    const result = filterNews(NEWS, undefined)
    expect(result).toHaveLength(NEWS.length)
  })

  it('returns only news of specified category', () => {
    const result = filterNews(NEWS, 'Технологии')
    expect(result.length).toBeGreaterThan(0)
    result.forEach(item => expect(item.category).toBe('Технологии'))
  })

  it('returns empty array for non-existent category', () => {
    const result = filterNews(NEWS, 'Несуществующая' as Category)
    expect(result).toHaveLength(0)
  })

  it('filters are case-sensitive', () => {
    const result = filterNews(NEWS, 'технологии' as Category)
    expect(result).toHaveLength(0)
  })
})

describe('paginateNews', () => {
  const items = Array.from({ length: 25 }, (_, i) => ({ ...NEWS[0], id: i + 1 }))

  it('returns correct page size', () => {
    const result = paginateNews(items, 1, 10)
    expect(result.items).toHaveLength(10)
  })

  it('returns last page with remaining items', () => {
    const result = paginateNews(items, 3, 10)
    expect(result.items).toHaveLength(5)
  })

  it('returns correct total', () => {
    const result = paginateNews(items, 1, 10)
    expect(result.total).toBe(25)
  })

  it('returns correct hasMore flag', () => {
    expect(paginateNews(items, 1, 10).hasMore).toBe(true)
    expect(paginateNews(items, 3, 10).hasMore).toBe(false)
  })

  it('returns correct page number', () => {
    const result = paginateNews(items, 2, 10)
    expect(result.page).toBe(2)
  })

  it('returns empty array for out-of-range page', () => {
    const result = paginateNews(items, 99, 10)
    expect(result.items).toHaveLength(0)
    expect(result.hasMore).toBe(false)
  })

  it('uses default page size of 12 when not specified', () => {
    const result = paginateNews(items, 1)
    expect(result.items).toHaveLength(12)
  })
})

describe('getNewsById', () => {
  it('returns news item by id', () => {
    const item = getNewsById(NEWS, 1)
    expect(item).toBeDefined()
    expect(item?.id).toBe(1)
  })

  it('returns undefined for non-existent id', () => {
    const item = getNewsById(NEWS, 9999)
    expect(item).toBeUndefined()
  })
})
