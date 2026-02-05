<script setup lang="ts">
defineProps<{
  title: string
  date: string
  authorName: string
  authorUrl: string
}>()
</script>

<template>
  <div class="flex flex-col items-start justify-between w-full">
    <h1 class="text-4xl font-bold mb-4">{{ title }}</h1>
    <NuxtLink :to="authorUrl" class="text-lg text-gray-400">
      by
      <span class="font-bold text-xl text-green-600 hover:text-green-500 hover:underline">
        {{ authorName }}
      </span>
    </NuxtLink>
    <span class="text-lg text-gray-400">{{ date }}</span>
  </div>
</template>
