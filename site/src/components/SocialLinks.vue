<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  direction?: 'horizontal' | 'vertical'
}>()

const socialLinks = [
  { icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/janhoon', label: 'LinkedIn profile' },
  { icon: 'mdi:github', url: 'https://github.com/janhoon', label: 'GitHub profile' },
  { icon: 'ri:twitter-x-fill', url: 'https://x.com/janhendrikhoon', label: 'X (Twitter) profile' },
]
</script>

<template>
  <div
    class="flex gap-4"
    :class="direction === 'vertical' ? 'flex-col' : 'flex-row'"
  >
    <a
      v-for="link in socialLinks"
      :key="link.url"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="link.label"
      class="text-gray-400 hover:text-gray-100 hover:scale-110 active:scale-90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded-full p-1"
    >
      <Icon :icon="link.icon" class="w-5 h-5" />
    </a>
  </div>
</template>
