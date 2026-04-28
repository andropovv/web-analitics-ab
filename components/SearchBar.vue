<template>
  <div class="search" :class="{ 'search--active': modelValue }">
    <div class="search__inner">
      <svg class="search__icon" viewBox="0 0 20 20" fill="none">
        <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.8"/>
        <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
      <input
        ref="inputRef"
        class="search__input"
        type="search"
        placeholder="Поиск новостей..."
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <button v-if="modelValue" class="search__clear" @click="$emit('update:modelValue', '')">
        <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits<{ 'update:modelValue': [value: string] }>()
const inputRef = ref<HTMLInputElement>()
</script>

<style scoped>
.search {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 56px;
  z-index: 89;
  transition: box-shadow 0.2s;
}
.search--active {
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}
.search__inner {
  max-width: 600px;
  margin: 0 auto;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.search__icon {
  width: 18px;
  height: 18px;
  color: var(--text-muted);
  flex-shrink: 0;
}
.search__input {
  flex: 1;
  border: none;
  background: none;
  font: inherit;
  font-size: 0.95rem;
  color: var(--text-primary);
  outline: none;
}
.search__input::placeholder { color: var(--text-muted); }
.search__input::-webkit-search-cancel-button { display: none; }
.search__clear {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 4px;
  transition: color 0.15s;
}
.search__clear:hover { color: var(--text-primary); }
</style>
