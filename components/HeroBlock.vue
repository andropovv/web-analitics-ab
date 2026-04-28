<template>
  <section class="hero container">
    <div class="hero__grid">
      <NuxtLink :to="`/news/${main.id}`" class="hero__main">
        <img :src="main.image" :alt="main.title" class="hero__main-img" />
        <div class="hero__main-overlay">
          <span class="hero__cat">{{ main.category }}</span>
          <h2 class="hero__main-title">{{ main.title }}</h2>
          <p class="hero__main-excerpt">{{ main.excerpt }}</p>
          <span class="hero__meta">{{ formatDate(main.publishedAt) }} · {{ main.readTime }} мин</span>
        </div>
      </NuxtLink>

      <div class="hero__side">
        <NuxtLink
          v-for="item in side"
          :key="item.id"
          :to="`/news/${item.id}`"
          class="hero__side-card"
        >
          <img :src="item.image" :alt="item.title" class="hero__side-img" />
          <div class="hero__side-body">
            <span class="hero__cat hero__cat--sm">{{ item.category }}</span>
            <h3 class="hero__side-title">{{ item.title }}</h3>
            <span class="hero__meta">{{ formatDate(item.publishedAt) }}</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { NewsItem } from '~/data/news'

const { data } = await useFetch<{ items: NewsItem[] }>('/api/news', {
  params: { page: 1, pageSize: 3 },
})

const main = computed(() => data.value!.items[0])
const side = computed(() => data.value!.items.slice(1, 3))

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' }).format(new Date(iso))
}
</script>

<style scoped>
.hero {
  padding-top: 28px;
  padding-bottom: 0;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 16px;
  height: 400px;
}

@media (max-width: 768px) {
  .hero__grid {
    grid-template-columns: 1fr;
    height: auto;
  }
}

.hero__main {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  display: block;
}
.hero__main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.hero__main:hover .hero__main-img { transform: scale(1.03); }

.hero__main-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 55%, transparent 100%);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 8px;
}

.hero__cat {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  width: fit-content;
}
.hero__cat--sm { font-size: 0.65rem; padding: 2px 7px; }

.hero__main-title {
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}
.hero__main-excerpt {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hero__meta {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.6);
}

.hero__side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
@media (max-width: 768px) {
  .hero__side { display: none; }
}

.hero__side-card {
  display: flex;
  gap: 12px;
  background: var(--surface);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  flex: 1;
  transition: box-shadow 0.15s, transform 0.15s;
}
.hero__side-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}
.hero__side-img {
  width: 110px;
  flex-shrink: 0;
  object-fit: cover;
  height: 100%;
}
.hero__side-body {
  padding: 14px 14px 14px 4px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
}
.hero__side-title {
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
  color: var(--text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.hero__side .hero__meta { color: var(--text-muted); }
</style>
