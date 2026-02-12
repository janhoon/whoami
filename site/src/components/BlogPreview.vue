<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

type BlogPost = {
  id: string
  title: string
  date: string
  description?: string
}

const props = withDefaults(
  defineProps<{
    posts: BlogPost[]
    title?: string
    limit?: number
  }>(),
  {
    title: 'Latest blog posts',
    limit: undefined,
  }
)

const visiblePosts = computed(() => {
  if (typeof props.limit !== 'number') {
    return props.posts
  }

  return props.posts.slice(0, props.limit)
})

const dateFormatter = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

function formatDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) {
    return date
  }

  return dateFormatter.format(parsed)
}
</script>

<template>
  <div>
    <h3 class="text-2xl font-semibold text-slate-900 mb-4">{{ props.title }}</h3>
    <ul class="grid gap-3">
      <li v-for="post in visiblePosts" :key="post.id">
        <a
          :href="`/blog/${post.id}`"
          class="group block p-4 rounded-2xl border border-slate-200 bg-white/80 hover:bg-white transition-colors"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-2">
              <p class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                {{ formatDate(post.date) }}
              </p>
              <h4 class="text-lg font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
                {{ post.title }}
              </h4>
              <p v-if="post.description" class="text-sm leading-relaxed text-slate-600">
                {{ post.description }}
              </p>
            </div>
            <Icon icon="lucide:arrow-up-right" class="w-5 h-5 mt-1 text-slate-500 group-hover:text-teal-700 shrink-0 transition-colors" />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
