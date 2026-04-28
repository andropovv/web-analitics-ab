<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo">
        <span class="header__logo-icon">📰</span>
        <span class="header__logo-text">NewsFlow</span>
      </NuxtLink>
      <span class="header__tagline">Умная лента новостей</span>
      <NuxtLink to="/saved" class="header__saved">
        <svg viewBox="0 0 20 20" width="18" height="18" fill="none">
          <path
            d="M5 3h10a1 1 0 0 1 1 1v13l-6-3-6 3V4a1 1 0 0 1 1-1z"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linejoin="round"
          />
        </svg>
        <span class="header__saved-label">Сохранённые</span>
        <span v-if="count" class="header__saved-badge">{{ count }}</span>
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const { ids, load } = useBookmarks()
onMounted(load)
const count = computed(() => ids.value.length)
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
}
.header__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 56px;
}
.header__logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent);
}
.header__logo-icon { font-size: 1.4rem; }
.header__tagline {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-left: auto;
}
@media (max-width: 480px) {
  .header__tagline { display: none; }
  .header__saved-label { display: none; }
}
.header__saved {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  transition: color 0.15s, background 0.15s;
  position: relative;
  margin-left: 4px;
}
.header__saved:hover {
  color: var(--accent);
  background: var(--accent-light);
}
.header__saved-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background: var(--accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  border-radius: 9px;
}
</style>
