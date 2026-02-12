<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  activeTab: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:activeTab': [tab: string]
  'update:isOpen': [isOpen: boolean]
}>()

const menuItems = [
  { name: 'about', icon: 'lucide:user', label: 'About' },
  { name: 'blog', icon: 'lucide:file-text', label: 'Blog' },
  { name: 'projects', icon: 'lucide:briefcase', label: 'Projects' },
]

function getPosition(index: number) {
  const radiusOffset = 100
  const angle = props.isOpen
    ? (index / menuItems.length / 1.8) * Math.PI - Math.PI / 2.6
    : -Math.PI / 300
  const x = Math.cos(angle) * (radiusOffset + 30)
  const y = Math.sin(angle) * (radiusOffset + 30) + radiusOffset

  return {
    left: `calc(50% + ${x}px - 20px)`,
    top: `calc(50% + ${y}px - 20px)`,
  }
}
</script>

<template>
  <div>
    <div class="relative">
      <button
        v-for="(item, index) in menuItems"
        :key="item.name"
        class="absolute w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
        :class="[
          activeTab === item.name
            ? 'bg-green-600 text-white scale-100 opacity-100'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600',
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0',
        ]"
        :style="getPosition(index)"
        :aria-label="`Navigate to ${item.label}`"
        @click="emit('update:activeTab', item.name)"
      >
        <Icon :icon="item.icon" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
