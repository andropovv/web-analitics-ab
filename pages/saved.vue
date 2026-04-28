<template>
  <div>
    <AppHeader />

    <main class="container saved">
      <div class="saved__header">
        <NuxtLink to="/" class="saved__back">← Назад к ленте</NuxtLink>
        <h1 class="saved__title">Сохранённые новости</h1>
        <p v-if="news.length" class="saved__count">{{ news.length }} {{ pluralize(news.length) }}</p>
      </div>

      <div v-if="news.length" class="saved__grid">
        <article
          v-for="item in news"
          :key="item.id"
          class="saved__card"
        >
          <NuxtLink :to="`/news/${item.id}`" class="saved__card-link">
            <div class="saved__card-img-wrap">
              <img :src="item.image" :alt="item.title" class="saved__card-img" loading="lazy" />
              <span class="saved__card-cat">{{ item.category }}</span>
            </div>
            <div class="saved__card-body">
              <h2 class="saved__card-title">{{ item.title }}</h2>
              <p class="saved__card-excerpt">{{ item.excerpt }}</p>
              <div class="saved__card-meta">
                <time class="saved__card-time">{{ formatDate(item.publishedAt) }}</time>
                <span class="saved__card-read">{{ item.readTime }} мин</span>
              </div>
            </div>
          </NuxtLink>
          <button class="saved__remove" title="Удалить из сохранённых" @click="remove(item.id)">
            <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </article>
      </div>

      <div v-else class="saved__empty">
        <div class="saved__empty-icon">🔖</div>
        <p class="saved__empty-text">Нет сохранённых новостей</p>
        <p class="saved__empty-hint">Нажмите «Сохранить» на странице любой новости</p>
        <NuxtLink to="/" class="saved__empty-link">Перейти к ленте</NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/data/news'

const { ids, toggle, load } = useBookmarks()

onMounted(load)

const news = ref<NewsItem[]>([])

async function fetchSaved() {
  if (!ids.value.length) {
    news.value = []
    return
  }
  const results = await Promise.all(
    ids.value.map(id => $fetch<NewsItem>(`/api/news/${id}`).catch(() => null)),
  )
  news.value = results.filter((n): n is NewsItem => n !== null)
}

watch(ids, fetchSaved)
onMounted(fetchSaved)

function remove(id: number) {
  toggle(id)
  news.value = news.value.filter(n => n.id !== id)
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date(iso))
}

function pluralize(n: number) {
  if (n % 10 === 1 && n % 100 !== 11) return 'новость'
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'новости'
  return 'новостей'
}

useHead({ title: 'Сохранённые — NewsFlow' })
</script>

<style scoped>
.saved {
  padding-top: 28px;
  padding-bottom: 64px;
}
.saved__header {
  margin-bottom: 28px;
}
.saved__back {
  display: inline-block;
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 12px;
}
.saved__back:hover { text-decoration: underline; }
.saved__title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
}
.saved__count {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-top: 4px;
}

.saved__grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 720px;
}

.saved__card {
  position: relative;
  background: var(--surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow 0.15s, transform 0.15s;
}
.saved__card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.saved__card-link {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.saved__card-img-wrap {
  position: relative;
  flex-shrink: 0;
  width: 200px;
  height: 150px;
  overflow: hidden;
}
.saved__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.saved__card:hover .saved__card-img { transform: scale(1.03); }
.saved__card-cat {
  position: absolute;
  top: 8px;
  left: 8px;
  background: var(--accent);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.saved__card-body {
  padding: 14px 48px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
}
.saved__card-title {
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.saved__card-excerpt {
  font-size: 0.825rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}
.saved__card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.saved__card-time,
.saved__card-read {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.saved__remove {
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--text-muted);
  padding: 4px;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
  z-index: 1;
}
.saved__remove:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.08);
}

.saved__empty {
  text-align: center;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.saved__empty-icon { font-size: 3rem; }
.saved__empty-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
}
.saved__empty-hint {
  font-size: 0.875rem;
  color: var(--text-muted);
}
.saved__empty-link {
  margin-top: 8px;
  padding: 8px 24px;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.15s;
}
.saved__empty-link:hover { background: var(--accent-hover); }

@media (max-width: 480px) {
  .saved__card-link { flex-direction: column; }
  .saved__card-img-wrap { width: 100%; aspect-ratio: 16/9; height: auto; }
  .saved__card-body { padding-right: 14px; }
  .saved__remove { top: auto; bottom: 10px; right: 10px; }
}
</style>
