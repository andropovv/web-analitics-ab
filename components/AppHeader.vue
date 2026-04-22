<template>
  <header class="header">
    <div class="container header__inner">
      <NuxtLink to="/" class="header__logo">
        <span class="header__logo-icon">📰</span>
        <span class="header__logo-text">NewsFlow</span>
      </NuxtLink>
      <span class="header__tagline">Умная лента новостей</span>
    </div>
  </header>
</template>

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
</style>
