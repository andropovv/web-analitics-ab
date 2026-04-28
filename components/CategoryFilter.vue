<template>
  <div class="category-filter">
    <div class="container">
      <div class="category-filter__list">
        <button
          class="category-filter__btn"
          :class="{ 'category-filter__btn--active': !modelValue }"
          @click="$emit('update:modelValue', undefined)"
        >
          Все
        </button>
        <button
          v-for="cat in categories"
          :key="cat"
          class="category-filter__btn"
          :class="{ 'category-filter__btn--active': modelValue === cat }"
          @click="$emit('update:modelValue', cat)"
        >
          {{ cat }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CATEGORIES } from '~/data/news'
import type { Category } from '~/data/news'

defineProps<{ modelValue: Category | undefined }>()
defineEmits<{ 'update:modelValue': [value: Category | undefined] }>()

const categories = CATEGORIES
</script>

<style scoped>
.category-filter {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 97px;
  z-index: 88;
}
.category-filter__list {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 12px 0;
  scrollbar-width: none;
}
.category-filter__list::-webkit-scrollbar { display: none; }
.category-filter__btn {
  flex-shrink: 0;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--surface-hover);
  border: 1px solid var(--border);
  transition: all 0.15s;
  white-space: nowrap;
}
.category-filter__btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}
.category-filter__btn--active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.category-filter__btn--active:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
</style>
