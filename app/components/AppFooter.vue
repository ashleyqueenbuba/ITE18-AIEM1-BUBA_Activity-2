<script setup lang="ts">
const year = 2026
// Fake hit counter, because no 90s page is complete without one.
const digits = '004217'.split('')
</script>

<template>
  <footer class="app-footer">
    <hr class="rainbow-rule">

    <div class="win">
      <div class="win-body app-footer__body">
        <div class="app-footer__counter-row">
          <span>You are visitor number</span>
          <span class="app-footer__counter" aria-label="Visitor count 4217">
            <b v-for="(digit, i) in digits" :key="i">{{ digit }}</b>
          </span>
        </div>

        <p class="blink app-footer__construction">🚧 This site is always under construction 🚧</p>

        <p class="app-footer__small">
          © {{ year }} Buba - Student Info Portal · Built with Nuxt &amp; reusable Vue components
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer__body {
  text-align: center;
}

.app-footer__counter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.app-footer__counter {
  display: inline-flex;
  gap: 2px;
}

.app-footer__counter b {
  min-width: 22px;
  padding: 2px 4px;
  font-family: var(--font-mono);
  font-size: 18px;
  color: #00ff00;
  background: #000;
  border: 2px solid;
  border-color: var(--shadow) var(--white) var(--white) var(--shadow);
}

.app-footer__construction {
  font-weight: bold;
  color: #cc0000;
}

.app-footer__small {
  margin: 0;
  font-size: 12px;
}
</style>
