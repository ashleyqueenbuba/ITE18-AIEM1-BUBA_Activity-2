// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/retro.css'],
  app: {
    head: {
      title: 'Student Info Portal',
      meta: [
        { name: 'description', content: 'A retro-styled student information website built with reusable Vue components.' },
      ],
    },
  },
})
