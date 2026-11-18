<script setup lang="ts">
// Customize the button with props: label, color and (optionally) textColor.
// Pass `to` for an internal link, `href` for an external one,
// or neither to get a normal <button> you can attach @click to.
const props = withDefaults(
  defineProps<{
    label: string
    color?: string
    textColor?: string
    to?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    color: '#c0c0c0',
    textColor: '#000000',
    to: undefined,
    href: undefined,
    type: 'button',
  },
)

const style = computed(() => ({
  backgroundColor: props.color,
  color: props.textColor,
}))
</script>

<template>
  <NuxtLink v-if="to" :to="to" class="app-button" :style="style">{{ label }}</NuxtLink>
  <a v-else-if="href" :href="href" class="app-button" :style="style" target="_blank" rel="noopener">{{ label }}</a>
  <button v-else :type="type" class="app-button" :style="style">{{ label }}</button>
</template>

<style scoped>
.app-button {
  display: inline-block;
  padding: 6px 18px;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid;
  border-color: var(--white) var(--shadow) var(--shadow) var(--white);
  box-shadow: 1px 1px 0 #000;
}

.app-button:visited {
  color: inherit;
}

.app-button:hover {
  filter: brightness(1.08);
}

.app-button:active {
  border-color: var(--shadow) var(--white) var(--white) var(--shadow);
  box-shadow: none;
  transform: translate(1px, 1px);
}

.app-button:focus-visible {
  outline: 1px dotted #000;
  outline-offset: -5px;
}
</style>
