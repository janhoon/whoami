<script setup lang="ts">
// Catch-all 404 page
</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <h2 class="text-2xl font-bold">Not Found</h2>
    <p class="text-gray-500">Could not find requested resource</p>
    <NuxtLink
      to="/"
      class="flex items-center gap-2 pt-4 text-green-400 hover:text-green-500"
    >
      <Icon name="lucide:home" class="w-5 h-5" />
      Return Home
    </NuxtLink>
  </div>
</template>
