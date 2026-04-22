import { NEWS } from '../../../data/news'
import { filterNews, paginateNews } from '../../utils/news'
import type { Category } from '../../../data/news'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const page = Math.max(1, Number(query.page) || 1)
  const pageSize = Math.min(50, Math.max(1, Number(query.pageSize) || 12))
  const category = query.category as Category | undefined

  const filtered = filterNews(NEWS, category)
  return paginateNews(filtered, page, pageSize)
})
