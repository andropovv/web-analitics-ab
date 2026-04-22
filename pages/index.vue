<template>
  <div>
    <AppHeader />
    <CategoryFilter v-model="activeCategory" />

    <main class="container main">
      <component
        :is="feedComponent"
        :variant="variant"
        :session-id="sessionId"
        :category="activeCategory"
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

await init()

const feedComponent = computed(() =>
  variant.value === 'A' ? LoadMoreFeed : InfiniteScrollFeed,
)

useHead({
  title: 'NewsFlow — главная',
})
</script>

<style scoped>
.main {
  padding-top: 24px;
  padding-bottom: 48px;
}
</style>
