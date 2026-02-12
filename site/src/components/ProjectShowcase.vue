<script setup lang="ts">
const projects = [
  {
    title: 'CADAC SQL Visualizer',
    description:
      'A SQL syntax tree visualizer that allows users to visualize and understand the structure of SQL queries.',
    url: 'https://sql.janhoon.com',
  },
]
</script>

<template>
  <div>
    <h3 class="text-2xl font-bold mb-4 font-mono">Featured Projects</h3>
    <div class="space-y-4">
      <div
        v-for="project in projects"
        :key="project.title"
        class="p-4 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors"
      >
        <a
          :href="project.url"
          class="hover:text-green-500 transition-colors"
          :aria-label="`View project: ${project.title}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h4 class="font-bold font-mono">{{ project.title }}</h4>
          <p class="text-sm text-gray-400 mt-1">{{ project.description }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
