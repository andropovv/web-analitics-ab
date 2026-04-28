<template>
  <div>
    <AppHeader />
    <SearchBar v-model="searchQuery" />
    <CategoryFilter v-if="!searchQuery" v-model="activeCategory" />

    <HeroBlock v-if="!searchQuery && !activeCategory" />

    <main class="container main">
      <p v-if="searchQuery" class="main__search-hint">
        Результаты по запросу: <strong>{{ searchQuery }}</strong>
      </p>
      <component
        :is="feedComponent"
        :variant="variant"
        :session-id="sessionId"
        :category="activeCategory"
        :search-query="searchQuery"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/data/news'
import LoadMoreFeed from '~/components/feed/LoadMoreFeed.vue'
import InfiniteScrollFeed from '~/components/feed/InfiniteScrollFeed.vue'

const { variant, sessionId, init } = useABVariant()
const activeCategory = ref<Category | undefined>(undefined)
const searchQuery = ref('')

await init()

const feedComponent = computed(() =>
  variant.value === 'A' ? LoadMoreFeed : InfiniteScrollFeed,
)

onMounted(() => {
  const w = window as any
  if (typeof w.ym === 'function' && variant.value) {
    w.ym(useRuntimeConfig().public.ymCounterId, 'params', { variant: variant.value })
  }
})

useHead({
  title: 'NewsFlow — главная',
})
</script>

<style scoped>
.main {
  padding-top: 24px;
  padding-bottom: 48px;
}
.main__search-hint {
  max-width: 720px;
  margin: 0 auto 20px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.main__search-hint strong {
  color: var(--text-primary);
}
</style>
