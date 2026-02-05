<script setup lang="ts">
const socialLinks = [
  { icon: 'mdi:linkedin', url: 'https://www.linkedin.com/in/janhoon' },
  { icon: 'mdi:github', url: 'https://github.com/janhoon' },
  { icon: 'ri:twitter-x-fill', url: 'https://x.com/janhendrikhoon' },
]
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: 50 }"
    :enter="{ opacity: 1, x: 0, transition: { duration: 500 } }"
    class="fixed top-4 right-4 flex flex-col space-y-4"
  >
    <a
      v-for="link in socialLinks"
      :key="link.url"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      class="text-gray-100 hover:text-gray-300 hover:scale-120 active:scale-90 transition-transform"
    >
      <Icon :name="link.icon" class="w-6 h-6" />
    </a>
  </div>
</template>
