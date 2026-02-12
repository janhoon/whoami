import { defineConfig } from 'astro/config'
import cloudflare from '@astrojs/cloudflare'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://janhoon.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'passthrough',
  }),
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
})
