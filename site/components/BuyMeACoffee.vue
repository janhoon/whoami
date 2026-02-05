<script setup lang="ts">
defineProps<{
  slug: string
}>()
</script>

<template>
  <a :href="`https://www.buymeacoffee.com/${slug}`">
    <img
      :src="`https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=${slug}&button_colour=16a349&font_colour=ffffff&font_family=Cookie&outline_colour=ffffff&coffee_colour=FFDD00`"
      alt="Buy me a coffee"
      width="240"
      height="80"
      loading="lazy"
    />
  </a>
</template>
