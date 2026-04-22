<template>
  <article ref="cardRef" class="news-card">
    <NuxtLink :to="`/news/${news.id}`" class="news-card__link">
      <div class="news-card__image-wrap">
        <img
          :src="news.image"
          :alt="news.title"
          class="news-card__image"
          loading="lazy"
        />
        <span class="news-card__category">{{ news.category }}</span>
      </div>
      <div class="news-card__body">
        <h2 class="news-card__title">{{ news.title }}</h2>
        <p class="news-card__excerpt">{{ news.excerpt }}</p>
        <div class="news-card__meta">
          <time class="news-card__time">{{ formattedDate }}</time>
          <span class="news-card__read-time">{{ news.readTime }} мин</span>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/data/news'
import { useNewsTracking } from '~/composables/useNewsTracking'

const props = defineProps<{
  news: NewsItem
  variant: 'A' | 'B'
  sessionId: string
}>()

const cardRef = ref<HTMLElement | null>(null)
const variantRef = computed(() => props.variant)
const sessionIdRef = computed(() => props.sessionId)

const { setupObserver } = useNewsTracking(variantRef, sessionIdRef)

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(props.news.publishedAt))
})

onMounted(() => {
  if (cardRef.value) {
    const cleanup = setupObserver(cardRef.value, props.news.id)
    onUnmounted(cleanup)
  }
})
</script>

<style scoped>
.news-card {
  background: var(--surface);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s, box-shadow 0.15s;
}
.news-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.news-card__link { display: flex; flex-direction: row; height: 100%; }
.news-card__image-wrap {
  position: relative;
  flex-shrink: 0;
  width: 200px;
  height: 180px;
  overflow: hidden;
}
.news-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
@media (max-width: 480px) {
  .news-card__link { flex-direction: column; }
  .news-card__image-wrap { width: 100%; aspect-ratio: 16/9; }
}
.news-card:hover .news-card__image { transform: scale(1.03); }
.news-card__category {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.news-card__body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}
.news-card__title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.news-card__excerpt {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.news-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
}
.news-card__time,
.news-card__read-time {
  font-size: 0.75rem;
  color: var(--text-muted);
}
</style>
