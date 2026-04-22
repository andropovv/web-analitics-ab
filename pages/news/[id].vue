<template>
  <div>
    <AppHeader />

    <main class="container article">
      <NuxtLink to="/" class="article__back">← Назад к ленте</NuxtLink>

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

        <div class="article__share">
          <button class="article__share-btn" @click="share">
            Поделиться
          </button>
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
const id = Number(route.params.id)

const { data: news } = await useFetch<NewsItem>(`/api/news/${id}`)

const formattedDate = computed(() =>
  news.value
    ? new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(news.value.publishedAt))
    : '',
)

async function share() {
  if (navigator.share) {
    await navigator.share({
      title: news.value?.title,
      url: window.location.href,
    })
  } else {
    await navigator.clipboard.writeText(window.location.href)
    alert('Ссылка скопирована!')
  }
}

useHead({
  title: news.value ? `${news.value.title} — NewsFlow` : 'NewsFlow',
})
</script>

<style scoped>
.article {
  padding-top: 24px;
  padding-bottom: 64px;
}
.article__back {
  display: inline-block;
  color: var(--accent);
  font-size: 0.875rem;
  margin-bottom: 24px;
  font-weight: 500;
}
.article__back:hover { text-decoration: underline; }
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
.article__share {
  margin-top: 40px;
}
.article__share-btn {
  padding: 10px 24px;
  background: var(--surface-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  font-weight: 500;
  transition: background 0.15s;
}
.article__share-btn:hover { background: var(--accent-light); color: var(--accent); border-color: var(--accent); }
.article__not-found {
  text-align: center;
  color: var(--text-muted);
  padding: 80px 0;
  font-size: 1.1rem;
}
</style>
