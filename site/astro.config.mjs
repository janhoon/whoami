import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://janhoon.com',
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [vue()],
  server: {
    host: true,
    port: 3000,
  },
  preview: {
    host: true,
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
