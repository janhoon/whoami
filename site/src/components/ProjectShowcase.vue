<script setup lang="ts">
const projects = [
  {
    title: 'CADAC SQL Visualizer',
    description:
      'Interactive SQL syntax tree explorer built to help analysts and engineers inspect query structure faster.',
    url: 'https://sql.janhoon.com',
    tags: ['SQL', 'Data tooling', 'Visualization'],
  },
]
</script>

<template>
  <div>
    <h2 class="display-heading text-3xl text-slate-900 mb-4">Featured project</h2>
    <div class="grid gap-4">
      <article
        v-for="project in projects"
        :key="project.title"
        class="rounded-2xl border border-slate-200 bg-white/80 p-5"
      >
        <a
          :href="project.url"
          class="group block"
          :aria-label="`View project: ${project.title}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p class="kicker mb-3">Production project</p>
          <h3 class="text-2xl font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
            {{ project.title }}
          </h3>
          <p class="text-slate-700 mt-3 leading-relaxed">{{ project.description }}</p>
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="chip"
            >
              {{ tag }}
            </span>
          </div>
          <span class="link-underline inline-block mt-5 text-slate-700 font-semibold">Open project</span>
        </a>
      </article>
    </div>
  </div>
</template>
