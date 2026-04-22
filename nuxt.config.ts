export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      ymCounterId: process.env.NUXT_PUBLIC_YM_COUNTER_ID || '',
    },
  },

  app: {
    head: {
      title: 'NewsFlow — умная лента новостей',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Персональная лента новостей по интересам' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: process.env.VERCEL ? 'vercel' : 'node-server',
  },
})
