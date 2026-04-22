import type { NewsItem, Category } from '../../data/news'

const DEFAULT_PAGE_SIZE = 12

export function filterNews(items: NewsItem[], category: Category | undefined): NewsItem[] {
  if (!category) return items
  return items.filter(item => item.category === category)
}

export interface PaginatedNews {
  items: NewsItem[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export function paginateNews(items: NewsItem[], page: number, pageSize = DEFAULT_PAGE_SIZE): PaginatedNews {
  const total = items.length
  const start = (page - 1) * pageSize
  const sliced = items.slice(start, start + pageSize)
  return {
    items: sliced,
    total,
    page,
    pageSize,
    hasMore: start + pageSize < total,
  }
}

export function getNewsById(items: NewsItem[], id: number): NewsItem | undefined {
  return items.find(item => item.id === id)
}
