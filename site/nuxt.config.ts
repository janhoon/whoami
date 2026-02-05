// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      // @ts-expect-error - tailwindcss vite plugin
      (await import('@tailwindcss/vite')).default(),
    ],
  },

  app: {
    head: {
      title: 'Jan Hoon',
      meta: [
        { name: 'description', content: 'Data and Platform Engineer' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },

  content: {
    // @nuxt/content v3 configuration
  },

  icon: {
    // Use Iconify for all icons
    serverBundle: 'remote',
  },

  routeRules: {
    // PostHog proxy rewrites
    '/ingest/static/**': { proxy: 'https://us-assets.i.posthog.com/static/**' },
    '/ingest/**': { proxy: 'https://eu.i.posthog.com/**' },
    '/ingest/decide': { proxy: 'https://eu.i.posthog.com/decide' },
  },

  image: {
    domains: ['github.com', 'img.buymeacoffee.com'],
  },

  runtimeConfig: {
    public: {
      posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || '',
    },
  },

  site: {
    url: 'https://janhoon.com',
  },
})
