<script setup lang="ts">
definePageMeta({
  layout: 'blog',
})

const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection('content').path(`/blog/${slug}`).first()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Blog post not found' })
}

useHead({
  title: `${article.value.title} - Jan Hoon`,
  meta: [
    { name: 'description', content: article.value.description || '' },
  ],
})
</script>

<template>
  <div v-if="article" class="w-full">
    <BlogTitle
      :title="(article as any).title"
      :date="(article as any).date"
      :author-name="(article as any).author?.name || 'Jan Hoon'"
      :author-url="(article as any).author?.url || 'https://janhoon.com'"
    />

    <div class="prose prose-invert prose-lg max-w-none mt-8">
      <ContentRenderer :value="article" />
    </div>

    <BlogFooter
      author="Jan Hoon"
      about="Data & Platform Engineer"
      coffee-slug="janhoon"
      image-url="https://github.com/janhoon.png"
      github-url="https://github.com/janhoon"
      linkedin-url="https://www.linkedin.com/in/janhoon"
      x-url="https://x.com/janhoon"
    />
  </div>
</template>

<style>
@reference "tailwindcss";

/* Markdown content styling */
.prose h1 { @apply text-4xl font-bold mb-3 mt-5; }
.prose h2 { @apply text-3xl font-bold mb-3 mt-5; }
.prose h3 { @apply text-2xl font-bold mb-3 mt-5; }
.prose h4 { @apply text-xl font-bold mb-3 mt-5; }
.prose p { @apply text-lg mb-2; }
.prose ul { @apply list-disc list-outside gap-2 flex flex-col; }
.prose li { @apply text-lg; }
.prose strong { @apply font-bold; }
.prose em { @apply italic; }
.prose a { @apply text-green-500 hover:text-green-400 underline; }
</style>
