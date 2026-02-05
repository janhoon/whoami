<script setup lang="ts">
defineProps<{
  author: string
  about: string
  coffeeSlug: string
  imageUrl: string
  githubUrl?: string
  linkedinUrl?: string
  xUrl?: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-between w-full gap-4 py-4">
    <div class="flex flex-row items-center justify-start bg-gray-700 rounded-lg p-4 w-full gap-4">
      <img
        :src="imageUrl"
        :alt="author"
        width="100"
        height="100"
        class="rounded-full"
        loading="lazy"
      />
      <div class="flex flex-col items-start justify-between w-full">
        <span class="text-lg font-bold">{{ author }}</span>
        <span class="text-sm text-gray-400">{{ about }}</span>
      </div>
      <div class="flex flex-col items-end justify-start gap-1">
        <NuxtLink
          v-if="githubUrl"
          :to="githubUrl"
          aria-label="GitHub profile"
          class="text-sm text-gray-400 hover:text-white"
        >
          <Icon name="mdi:github" class="w-6 h-6" />
        </NuxtLink>
        <NuxtLink
          v-if="linkedinUrl"
          :to="linkedinUrl"
          aria-label="LinkedIn profile"
          class="text-sm text-gray-400 hover:text-blue-500"
        >
          <Icon name="mdi:linkedin" class="w-6 h-6" />
        </NuxtLink>
        <NuxtLink
          v-if="xUrl"
          :to="xUrl"
          aria-label="X (Twitter) profile"
          class="text-sm text-gray-400 hover:text-white"
        >
          <Icon name="ri:twitter-x-fill" class="w-6 h-6" />
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-row items-center justify-between w-full">
      <NuxtLink
        to="/blog"
        class="text-sm flex flex-row items-center justify-center gap-2 text-green-500 hover:text-green-600"
      >
        <Icon name="lucide:arrow-left" class="w-4 h-4" />
        Back to blogs
      </NuxtLink>
      <BuyMeACoffee :slug="coffeeSlug" />
    </div>
  </div>
</template>
