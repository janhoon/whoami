<script setup lang="ts">
const tabs = ['about', 'blog', 'projects'] as const
type Tab = typeof tabs[number]

const activeTab = ref<Tab>('about')
const isMenuOpen = ref(true)
const lastScrollTime = ref(0)
const scrollAccumulator = ref(0)

const skillData = [
  { name: 'Kubernetes', value: 70, icon: 'simple-icons:kubernetes' },
  { name: 'Databricks', value: 80, icon: 'simple-icons:databricks' },
  { name: 'React', value: 50, icon: 'simple-icons:react' },
  { name: 'Observability', value: 40, icon: 'simple-icons:grafana' },
  { name: 'Software Engineering', value: 60, icon: 'lucide:code' },
]

const otherSkills = [
  { name: 'Docker', icon: 'simple-icons:docker' },
  { name: 'Snowflake', icon: 'simple-icons:snowflake' },
  { name: 'AWS', icon: 'simple-icons:amazonwebservices' },
  { name: 'Azure', icon: 'mdi:microsoft-azure' },
  { name: 'GCP', icon: 'simple-icons:googlecloud' },
  { name: 'Go', icon: 'simple-icons:go' },
  { name: 'Python', icon: 'simple-icons:python' },
  { name: 'TypeScript', icon: 'simple-icons:typescript' },
  { name: 'Terraform', icon: 'simple-icons:terraform' },
]

function changeTab(direction: 'next' | 'prev') {
  const currentIndex = tabs.indexOf(activeTab.value)
  let newIndex: number

  if (direction === 'next') {
    newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1
  } else {
    newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
  }

  activeTab.value = tabs[newIndex]
}

function handleWheel(event: WheelEvent) {
  const now = Date.now()
  if (now - lastScrollTime.value < 500) {
    scrollAccumulator.value += event.deltaY
    return
  }

  const threshold = 300
  const newAccumulator = scrollAccumulator.value + event.deltaY

  if (Math.abs(newAccumulator) >= threshold) {
    lastScrollTime.value = now
    if (newAccumulator > 0) {
      changeTab('next')
    } else {
      changeTab('prev')
    }
    scrollAccumulator.value = 0
  } else {
    scrollAccumulator.value = newAccumulator
  }
}

onMounted(() => {
  window.addEventListener('wheel', handleWheel)
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
})

// Animated skill bar widths
const animatedWidths = ref<number[]>(skillData.map(() => 0))

onMounted(() => {
  requestAnimationFrame(() => {
    animatedWidths.value = skillData.map((s) => s.value)
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Top nav -->
    <div class="w-full flex flex-row py-4 px-4">
      <NuxtLink
        to="/blog"
        class="flex flex-row items-center p-2 gap-1 hover:text-green-600"
      >
        <Icon name="lucide:book" class="w-4 h-4" />
        Blog
      </NuxtLink>
    </div>

    <!-- Main content -->
    <main class="flex-grow flex flex-col items-center justify-center p-4">
      <div class="w-full max-w-6xl flex lg:flex-row items-center flex-col">
        <!-- Left column: Profile -->
        <div class="w-full md:w-2/3 pr-8 relative">
          <div
            v-motion
            :initial="{ opacity: 0, y: -50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }"
            class="mb-8 flex justify-center relative"
            @click="isMenuOpen = true"
          >
            <button>
              <img
                src="/images/pfp.jpg"
                alt="Jan Hoon"
                width="290"
                height="290"
                class="rounded-full shadow-lg w-[290px] h-[290px] object-cover"
              />
            </button>
            <div class="absolute inset-0 z-10">
              <RadialMenu
                :active-tab="activeTab"
                :is-open="isMenuOpen"
                @update:active-tab="activeTab = $event"
                @update:is-open="isMenuOpen = $event"
              />
            </div>
          </div>

          <h1
            v-motion
            :initial="{ opacity: 0, y: -50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 200 } }"
            class="text-4xl font-bold mb-2 text-center"
          >
            Jan Hoon
          </h1>

          <h2
            v-motion
            :initial="{ opacity: 0, y: 50 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 500, delay: 400 } }"
            class="text-2xl mb-8 text-center"
          >
            Data &amp; Platform Engineer
          </h2>
        </div>

        <!-- Right column: Tab content -->
        <div class="w-full lg:w-1/3 pl-8">
          <Transition name="tab" mode="out-in">
            <div :key="activeTab" class="w-full">
              <!-- About Tab -->
              <div v-if="activeTab === 'about'">
                <h2 class="text-2xl font-bold my-4">About Me</h2>
                <p>
                  Hi, I'm Jan, a passionate Data &amp; Platform Engineer. I love
                  working with data and building robust platforms to drive
                  insights and innovation.
                </p>
                <h2 class="text-2xl font-bold my-4">Skills</h2>
                <div class="flex flex-col gap-2 w-full">
                  <div
                    v-for="(skill, index) in skillData"
                    :key="skill.name"
                    class="flex flex-row items-center gap-2 bg-green-700 py-1 px-2 rounded-md transition-all duration-700 ease-out"
                    :style="{ width: animatedWidths[index] + '%' }"
                  >
                    <Icon :name="skill.icon" class="w-4 h-4 shrink-0" />
                    <p class="whitespace-nowrap">{{ skill.name }}</p>
                  </div>
                </div>
                <h2 class="text-lg font-bold my-4">Other Skills</h2>
                <div class="flex flex-row flex-wrap gap-2 w-full">
                  <UiBadge
                    v-for="skill in otherSkills"
                    :key="skill.name"
                    class="gap-2 bg-gray-900"
                  >
                    <Icon :name="skill.icon" class="w-4 h-4" />
                    {{ skill.name }}
                  </UiBadge>
                </div>
              </div>

              <!-- Blog Tab -->
              <div v-else-if="activeTab === 'blog'">
                <BlogPreview />
                <NuxtLink
                  to="/blog"
                  class="flex flex-row items-center gap-1 text-green-500"
                >
                  View All
                  <Icon name="lucide:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>

              <!-- Projects Tab -->
              <div v-else-if="activeTab === 'projects'">
                <ProjectShowcase />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </main>

    <SocialLinks />
  </div>
</template>

<style scoped>
@reference "tailwindcss";

.tab-enter-active,
.tab-leave-active {
  transition: all 0.3s ease;
}

.tab-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.tab-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
