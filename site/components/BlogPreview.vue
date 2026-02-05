<script setup lang="ts">
import blogPosts from '~/data/blog_posts.json'

const posts = blogPosts.slice(0, 3)
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold mb-4">Latest Blog Posts</h3>
    <ul class="space-y-2">
      <NuxtLink
        v-for="(post, index) in posts"
        :key="post.id"
        :to="`/blog/${post.id}`"
      >
        <li
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 300, delay: index * 100 } }"
          class="p-4 rounded-lg border-b last:border-b-0 hover:bg-gray-700 w-full"
        >
          <h4 class="font-bold">{{ post.title }}</h4>
          <div class="flex flex-row items-center justify-between">
            <p class="text-sm text-gray-400">{{ post.date }}</p>
            <span class="flex flex-row items-center justify-center gap-2 text-green-600 hover:underline">
              <Icon name="lucide:book" class="w-4 h-4" />
              Read more
            </span>
          </div>
        </li>
      </NuxtLink>
    </ul>
  </div>
</template>
