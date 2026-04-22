import type { NewsItem, Category } from '~/data/news'

interface FeedResponse {
  items: NewsItem[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export function useNewsFeed(initialCategory?: Category) {
  const items = ref<NewsItem[]>([])
  const page = ref(1)
  const hasMore = ref(true)
  const loading = ref(false)
  const category = ref<Category | undefined>(initialCategory)

  async function load(reset = false) {
    if (loading.value) return
    loading.value = true

    try {
      if (reset) {
        page.value = 1
        items.value = []
        hasMore.value = true
      }

      const params: Record<string, string | number> = { page: page.value }
      if (category.value) params.category = category.value

      const data = await $fetch<FeedResponse>('/api/news', { params })

      items.value = reset ? data.items : [...items.value, ...data.items]
      hasMore.value = data.hasMore
      page.value += 1
    } finally {
      loading.value = false
    }
  }

  function setCategory(cat: Category | undefined) {
    category.value = cat
    load(true)
  }

  return { items, hasMore, loading, load, setCategory, category }
}
