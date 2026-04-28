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

    <div v-if="hasMore" class="feed__footer">
      <button
        class="feed__load-more"
        :disabled="loading"
        @click="load()"
      >
        <span v-if="loading" class="feed__spinner" />
        <span v-else>Загрузить ещё</span>
      </button>
    </div>

    <div v-if="!hasMore && items.length" class="feed__end">
      Вы просмотрели все новости
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/data/news'

const props = defineProps<{
  variant: 'A' | 'B'
  sessionId: string
  category: Category | undefined
  searchQuery?: string
}>()

const { items, hasMore, loading, load, setCategory, setQuery } = useNewsFeed()

watch(() => props.category, (cat) => setCategory(cat))
watch(() => props.searchQuery, (q) => setQuery(q ?? ''))

onMounted(() => load())
</script>

<style scoped>
.feed__grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 720px;
  margin: 0 auto;
}
.feed__footer {
  display: flex;
  justify-content: center;
  padding: 32px 0;
}
.feed__load-more {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 32px;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 600;
  transition: background 0.15s, transform 0.1s;
}
.feed__load-more:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-1px);
}
.feed__load-more:disabled { opacity: 0.6; cursor: not-allowed; }
.feed__spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.4);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
.feed__end {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
  padding: 24px;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
