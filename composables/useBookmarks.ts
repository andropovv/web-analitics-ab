import type { NewsItem } from '~/data/news'

const STORAGE_KEY = 'nf_bookmarks'

export function useBookmarks() {
  const ids = useState<number[]>('bookmarks', () => [])

  function load() {
    if (!process.client) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) ids.value = JSON.parse(raw)
    } catch {}
  }

  function persist() {
    if (!process.client) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.value))
  }

  function toggle(id: number) {
    load()
    if (ids.value.includes(id)) {
      ids.value = ids.value.filter(b => b !== id)
    } else {
      ids.value = [...ids.value, id]
    }
    persist()
  }

  function isBookmarked(id: number) {
    return ids.value.includes(id)
  }

  return { ids, toggle, isBookmarked, load }
}
