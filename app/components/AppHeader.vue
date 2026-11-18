<script setup lang="ts">
// Navigation links live in one place, so every page gets the same menu.
const links = [
  { label: '🏠 Home', to: '/' },
  { label: '🎓 Students', to: '/students' },
  { label: 'ℹ️ About', to: '/about' },
]
</script>

<template>
  <header class="app-header win">
    <div class="win-title">
      <span>🌐 Student Info Portal</span>
      <span class="win-controls" aria-hidden="true"><span>_</span><span>□</span><span>×</span></span>
    </div>

    <div class="win-body">
      <h1 class="app-header__logo">Student Info Portal</h1>

      <div class="app-header__marquee sunken" aria-hidden="true">
        <span>★ Welcome to the Class of 2026 homepage!★</span>
      </div>

      <nav class="app-header__nav" aria-label="Main navigation">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="app-header__link"
          exact-active-class="is-active"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.app-header__logo {
  margin: 0 0 10px;
  text-align: center;
  font-size: 32px;
  color: #ff00ff;
  text-shadow: 2px 2px 0 #000080, 4px 4px 0 #000;
}

.app-header__marquee {
  overflow: hidden;
  white-space: nowrap;
  padding: 4px 0;
  font-family: var(--font-mono);
  font-weight: bold;
  color: #00aa00;
  background: #000;
}

.app-header__marquee span {
  display: inline-block;
  padding-left: 100%;
  animation: app-header-scroll 18s linear infinite;
}

@keyframes app-header-scroll {
  to {
    transform: translateX(-100%);
  }
}

.app-header__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 12px;
}

.app-header__link {
  padding: 5px 16px;
  font-weight: bold;
  color: #000;
  text-decoration: none;
  background: var(--silver);
  border: 2px solid;
  border-color: var(--white) var(--shadow) var(--shadow) var(--white);
  box-shadow: 1px 1px 0 #000;
}

.app-header__link:visited {
  color: #000;
}

.app-header__link:hover {
  background: #d8d8d8;
}

.app-header__link.is-active {
  background: #ffff99;
  border-color: var(--shadow) var(--white) var(--white) var(--shadow);
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .app-header__marquee span {
    padding-left: 0;
    animation: none;
  }
}
</style>
