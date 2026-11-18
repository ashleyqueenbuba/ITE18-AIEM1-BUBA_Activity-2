<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section class="info-card win">
    <div class="win-title">
      <span>📄 {{ title }}</span>
      <span class="win-controls" aria-hidden="true"><span>?</span></span>
    </div>

    <div class="win-body">
      <p class="info-card__text">{{ description }}</p>
      <!-- Optional extra content (e.g. a button) can be dropped in here -->
      <div v-if="$slots.default" class="info-card__extra">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.info-card__text {
  padding: 8px;
  margin: 0;
  background: #fff;
  border: 2px solid;
  border-color: var(--shadow) var(--white) var(--white) var(--shadow);
}

.info-card__extra {
  margin-top: 10px;
  text-align: center;
}
</style>
