<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

type BlogPost = {
  id: string
  title: string
  date: string
}

const props = withDefaults(
  defineProps<{
    posts: BlogPost[]
    title?: string
    limit?: number
  }>(),
  {
    title: 'Latest Blog Posts',
    limit: undefined,
  }
)

const visiblePosts = computed(() => {
  if (typeof props.limit !== 'number') {
    return props.posts
  }

  return props.posts.slice(0, props.limit)
})
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold mb-4">{{ props.title }}</h3>
    <ul class="space-y-2">
      <li v-for="post in visiblePosts" :key="post.id">
        <a
          :href="`/blog/${post.id}`"
          class="block p-4 rounded-lg border-b last:border-b-0 hover:bg-gray-700 w-full transition-colors"
        >
          <h4 class="font-bold">{{ post.title }}</h4>
          <div class="flex flex-row items-center justify-between">
            <p class="text-sm text-gray-400">{{ post.date }}</p>
            <span class="flex flex-row items-center justify-center gap-2 text-green-600 hover:underline">
              <Icon icon="lucide:book" class="w-4 h-4" />
              Read more
            </span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
