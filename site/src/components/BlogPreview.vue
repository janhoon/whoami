<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed } from "vue";

type BlogPost = {
  id: string;
  title: string;
  date: string;
  description?: string;
};

const props = withDefaults(
  defineProps<{
    posts: BlogPost[];
    title?: string;
    limit?: number;
  }>(),
  {
    title: "Latest blog posts",
    limit: undefined,
  },
);

const visiblePosts = computed(() => {
  if (typeof props.limit !== "number") {
    return props.posts;
  }

  return props.posts.slice(0, props.limit);
});

const dateFormatter = new Intl.DateTimeFormat("en", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return dateFormatter.format(parsed);
}
</script>

<template>
  <div>
    <h3 class="mb-4 text-2xl font-semibold text-slate-900">
      {{ props.title }}
    </h3>
    <ul class="grid gap-3">
      <li v-for="post in visiblePosts" :key="post.id">
        <a
          :href="`/blog/${post.id}`"
          class="group focus-ring block rounded-2xl border border-slate-200 bg-white/80 p-4 transition-colors hover:bg-white"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-2">
              <p
                class="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500"
              >
                {{ formatDate(post.date) }}
              </p>
              <h4
                class="text-lg font-semibold text-slate-900 transition-colors group-hover:text-teal-700"
              >
                {{ post.title }}
              </h4>
              <p
                v-if="post.description"
                class="text-sm leading-relaxed text-slate-600"
              >
                {{ post.description }}
              </p>
            </div>
            <Icon
              icon="lucide:arrow-up-right"
              class="mt-1 h-5 w-5 shrink-0 text-slate-500 transition-colors group-hover:text-teal-700"
              aria-hidden="true"
            />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
