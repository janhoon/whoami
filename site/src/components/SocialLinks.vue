<script setup lang="ts">
defineProps<{
  direction?: 'horizontal' | 'vertical'
}>()

const socialLinks = [
  { icon: '/images/linkedin.svg', url: 'https://www.linkedin.com/in/janhoon', label: 'LinkedIn profile' },
  { icon: '/images/github_light.svg', url: 'https://github.com/janhoon', label: 'GitHub profile' },
  { icon: '/images/x_light.svg', url: 'https://x.com/janhendrikhoon', label: 'X (Twitter) profile' },
]
</script>

<template>
  <div
    class="flex gap-2"
    :class="direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'"
  >
    <a
      v-for="link in socialLinks"
      :key="link.url"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="link.label"
      class="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-slate-700 hover:text-teal-700 hover:border-teal-700/30 transition-colors"
    >
      <img :src="link.icon" :alt="link.label" class="w-4 h-4" loading="lazy" />
      <span class="text-sm font-semibold">{{ link.label.split(' ')[0] }}</span>
    </a>
  </div>
</template>
