<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { nextTick, ref } from 'vue'
import BlogPreview from './BlogPreview.vue'
import ProjectShowcase from './ProjectShowcase.vue'
import RadialMenu from './RadialMenu.vue'
import SocialLinks from './SocialLinks.vue'

type BlogPost = {
  id: string
  title: string
  date: string
}

const props = defineProps<{
  posts: BlogPost[]
}>()

const tabs = ['about', 'blog', 'projects'] as const
type Tab = (typeof tabs)[number]

const activeTab = ref<Tab>('about')
const isMenuOpen = ref(true)

const tabMeta: Record<Tab, { label: string; icon: string }> = {
  about: { label: 'About', icon: 'lucide:user' },
  blog: { label: 'Blog', icon: 'lucide:file-text' },
  projects: { label: 'Projects', icon: 'lucide:briefcase' },
}

const skillCategories = [
  {
    name: 'Platform & Infrastructure',
    icon: 'lucide:server',
    skills: [
      { name: 'Kubernetes', icon: 'simple-icons:kubernetes' },
      { name: 'Docker', icon: 'simple-icons:docker' },
      { name: 'Terraform', icon: 'simple-icons:terraform' },
      { name: 'AWS', icon: 'simple-icons:amazonwebservices' },
      { name: 'Azure', icon: 'mdi:microsoft-azure' },
      { name: 'GCP', icon: 'simple-icons:googlecloud' },
    ],
  },
  {
    name: 'Data Engineering',
    icon: 'lucide:database',
    skills: [
      { name: 'Databricks', icon: 'simple-icons:databricks' },
      { name: 'Snowflake', icon: 'simple-icons:snowflake' },
      { name: 'Grafana', icon: 'simple-icons:grafana' },
    ],
  },
  {
    name: 'Languages & Frameworks',
    icon: 'lucide:code',
    skills: [
      { name: 'Go', icon: 'simple-icons:go' },
      { name: 'Python', icon: 'simple-icons:python' },
      { name: 'TypeScript', icon: 'simple-icons:typescript' },
      { name: 'React', icon: 'simple-icons:react' },
    ],
  },
]

function handleTabKeydown(event: KeyboardEvent) {
  const currentIndex = tabs.indexOf(activeTab.value)
  let newIndex = currentIndex

  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    event.preventDefault()
    newIndex = (currentIndex + 1) % tabs.length
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    event.preventDefault()
    newIndex = (currentIndex - 1 + tabs.length) % tabs.length
  }

  if (newIndex !== currentIndex) {
    activeTab.value = tabs[newIndex]
    nextTick(() => {
      document.getElementById(`tab-${tabs[newIndex]}`)?.focus()
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <aside
      class="relative w-full lg:w-1/3 lg:max-w-sm xl:max-w-md lg:sticky lg:top-0 lg:h-screen flex flex-col items-center p-6 lg:p-8 lg:justify-center lg:border-r lg:border-gray-700/50"
    >
      <div class="relative mb-4 lg:mb-6">
        <button
          class="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
          aria-label="Toggle radial navigation menu"
          @click="isMenuOpen = !isMenuOpen"
        >
          <img
            src="/images/pfp.jpg"
            alt="Profile photo of Jan Hoon, Data and Platform Engineer"
            width="200"
            height="200"
            class="rounded-full shadow-lg w-40 h-40 md:w-48 md:h-48 lg:w-[200px] lg:h-[200px] object-cover"
          />
        </button>
        <div class="absolute inset-0 z-10 hidden lg:block" aria-hidden="true">
          <RadialMenu
            :active-tab="activeTab"
            :is-open="isMenuOpen"
            @update:active-tab="activeTab = $event"
            @update:is-open="isMenuOpen = $event"
          />
        </div>
      </div>

      <h1 class="text-2xl lg:text-3xl font-bold text-center">Jan Hoon</h1>

      <h2 class="text-base lg:text-lg text-gray-400 text-center mt-1 font-mono">
        Data &amp; Platform Engineer
      </h2>

      <nav
        role="tablist"
        aria-label="Content sections"
        class="flex flex-row lg:flex-col gap-1 mt-6 lg:mt-8 w-full max-w-xs"
        @keydown="handleTabKeydown"
      >
        <button
          v-for="tab in tabs"
          :key="tab"
          :id="`tab-${tab}`"
          role="tab"
          :aria-selected="activeTab === tab"
          :aria-controls="`panel-${tab}`"
          :tabindex="activeTab === tab ? 0 : -1"
          class="flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm lg:text-base flex-1 lg:flex-initial justify-center lg:justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
          :class="
            activeTab === tab
              ? 'bg-green-600/15 text-green-500 font-semibold'
              : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
          "
          @click="activeTab = tab"
        >
          <Icon :icon="tabMeta[tab].icon" class="w-4 h-4" />
          <span>{{ tabMeta[tab].label }}</span>
        </button>
      </nav>

      <div class="mt-6 lg:absolute lg:bottom-8">
        <SocialLinks />
      </div>
    </aside>

    <main class="flex-1 p-6 lg:py-12 lg:px-16" aria-live="polite">
      <div class="max-w-2xl">
        <Transition name="tab" mode="out-in">
          <div
            :key="activeTab"
            :id="`panel-${activeTab}`"
            role="tabpanel"
            :aria-labelledby="`tab-${activeTab}`"
          >
            <div v-if="activeTab === 'about'">
              <h2 class="text-2xl font-bold mb-4 font-mono">About Me</h2>
              <p class="text-gray-300 leading-relaxed">
                Hi, I'm Jan, a passionate Data &amp; Platform Engineer. I love
                working with data and building robust platforms to drive
                insights and innovation.
              </p>

              <h2 class="text-2xl font-bold mt-10 mb-6 font-mono">Skills</h2>
              <div class="space-y-8">
                <div
                  v-for="category in skillCategories"
                  :key="category.name"
                >
                  <h3
                    class="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2"
                  >
                    <Icon :icon="category.icon" class="w-3.5 h-3.5" />
                    {{ category.name }}
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="skill in category.skills"
                      :key="skill.name"
                      class="inline-flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 transition-colors"
                    >
                      <Icon :icon="skill.icon" class="w-4 h-4 text-green-500 shrink-0" />
                      <span class="font-mono text-sm">{{ skill.name }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeTab === 'blog'">
              <BlogPreview :posts="props.posts" :limit="3" />
              <a
                href="/blog"
                class="inline-flex items-center gap-1 text-green-500 hover:text-green-400 mt-4 transition-colors"
                aria-label="View all blog posts"
              >
                View All
                <Icon icon="lucide:arrow-right" class="w-4 h-4" />
              </a>
            </div>

            <div v-else-if="activeTab === 'projects'">
              <ProjectShowcase />
            </div>
          </div>
        </Transition>
      </div>
    </main>
  </div>
</template>

<style scoped>
.tab-enter-active,
.tab-leave-active {
  transition: all 0.3s ease;
}

.tab-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.tab-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
