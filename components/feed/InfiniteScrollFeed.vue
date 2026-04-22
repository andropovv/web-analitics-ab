<template>
  <div class="feed">
    <div class="feed__grid">
      <NewsCard
        v-for="item in items"
        :key="item.id"
        :news="item"
        :variant="variant"
        :session-id="sessionId"
      />
    </div>

    <div ref="sentinelRef" class="feed__sentinel">
      <span v-if="loading" class="feed__spinner" />
      <span v-else-if="!hasMore && items.length" class="feed__end">
        Вы просмотрели все новости
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/data/news'

const props = defineProps<{
  variant: 'A' | 'B'
  sessionId: string
  category: Category | undefined
}>()

const { items, hasMore, loading, load, setCategory } = useNewsFeed()
const sentinelRef = ref<HTMLElement | null>(null)

watch(() => props.category, (cat) => setCategory(cat))

onMounted(() => {
  load()

  if (typeof IntersectionObserver === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !loading.value) {
        load()
      }
    },
    { rootMargin: '200px' },
  )

  if (sentinelRef.value) observer.observe(sentinelRef.value)
  onUnmounted(() => observer.disconnect())
})
</script>

<style scoped>
.feed__grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 720px;
  margin: 0 auto;
}
.feed__sentinel {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60px;
  padding: 16px;
}
.feed__spinner {
  display: block;
  width: 28px;
  height: 28px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.feed__end {
  color: var(--text-muted);
  font-size: 0.875rem;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
