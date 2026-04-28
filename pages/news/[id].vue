<template>
  <div>
    <AppHeader />

    <main class="container article">
      <div class="article__nav">
        <button class="article__back" @click="goBack">← Назад</button>
      </div>

      <article v-if="news" class="article__body">
        <div class="article__meta">
          <span class="article__category">{{ news.category }}</span>
          <time class="article__time">{{ formattedDate }}</time>
          <span class="article__read-time">{{ news.readTime }} мин чтения</span>
        </div>

        <h1 class="article__title">{{ news.title }}</h1>
        <p class="article__excerpt">{{ news.excerpt }}</p>

        <img
          :src="news.image"
          :alt="news.title"
          class="article__image"
        />

        <div class="article__content">
          <p>{{ news.content }}</p>
        </div>

        <div class="article__actions">
          <button
            class="article__save-btn"
            :class="{ 'article__save-btn--saved': saved }"
            @click="toggle(news.id)"
          >
            <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
              <path
                d="M5 3h10a1 1 0 0 1 1 1v13l-6-3-6 3V4a1 1 0 0 1 1-1z"
                :fill="saved ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linejoin="round"
              />
            </svg>
            {{ saved ? 'Сохранено' : 'Сохранить' }}
          </button>
        </div>

        <div v-if="related.length" class="article__related">
          <h2 class="article__related-title">Читайте также</h2>
          <div class="article__related-grid">
            <NuxtLink
              v-for="item in related"
              :key="item.id"
              :to="`/news/${item.id}`"
              class="article__related-card"
            >
              <img :src="item.image" :alt="item.title" class="article__related-img" loading="lazy" />
              <div class="article__related-body">
                <span class="article__related-cat">{{ item.category }}</span>
                <h3 class="article__related-heading">{{ item.title }}</h3>
              </div>
            </NuxtLink>
          </div>
        </div>
      </article>

      <div v-else class="article__not-found">
        Новость не найдена
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/data/news'

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const { data: news } = await useFetch<NewsItem>(`/api/news/${id}`)

const { data: relatedData } = await useFetch<{ items: NewsItem[] }>('/api/news', {
  params: computed(() => ({
    category: news.value?.category,
    pageSize: 4,
    page: 1,
  })),
})
const related = computed(() =>
  (relatedData.value?.items ?? []).filter(n => n.id !== id).slice(0, 3),
)

const { toggle, isBookmarked, load } = useBookmarks()
const saved = computed(() => isBookmarked(id))
onMounted(load)

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const formattedDate = computed(() =>
  news.value
    ? new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(news.value.publishedAt))
    : '',
)

useHead({
  title: news.value ? `${news.value.title} — NewsFlow` : 'NewsFlow',
})
</script>

<style scoped>
.article {
  padding-top: 24px;
  padding-bottom: 64px;
}
.article__nav {
  margin-bottom: 24px;
}
.article__back {
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 500;
  transition: opacity 0.15s;
}
.article__back:hover { opacity: 0.75; text-decoration: underline; }
.article__meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.article__category {
  background: var(--accent);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.article__time,
.article__read-time {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.article__title {
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 16px;
}
.article__excerpt {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  font-style: italic;
}
.article__image {
  width: 100%;
  border-radius: var(--radius-md);
  margin-bottom: 32px;
  max-height: 480px;
  object-fit: cover;
}
.article__content {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-primary);
  max-width: 720px;
}

.article__actions {
  margin-top: 40px;
  display: flex;
  gap: 12px;
}
.article__save-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: var(--surface-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.article__save-btn:hover {
  background: var(--accent-light);
  color: var(--accent);
  border-color: var(--accent);
}
.article__save-btn--saved {
  background: var(--accent-light);
  color: var(--accent);
  border-color: var(--accent);
}

.article__related {
  margin-top: 56px;
  max-width: 720px;
}
.article__related-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}
.article__related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
@media (max-width: 600px) {
  .article__related-grid { grid-template-columns: 1fr; }
}
.article__related-card {
  background: var(--surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  overflow: hidden;
  transition: transform 0.15s, box-shadow 0.15s;
}
.article__related-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.article__related-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}
.article__related-body {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.article__related-cat {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
}
.article__related-heading {
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article__not-found {
  text-align: center;
  color: var(--text-muted);
  padding: 80px 0;
  font-size: 1.1rem;
}
</style>
