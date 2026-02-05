<script setup lang="ts">
const props = defineProps<{
  activeTab: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:activeTab': [tab: string]
  'update:isOpen': [isOpen: boolean]
}>()

const menuItems = [
  { name: 'about', icon: 'lucide:user' },
  { name: 'blog', icon: 'lucide:file-text' },
  { name: 'projects', icon: 'lucide:briefcase' },
]

function getPosition(index: number) {
  const radiusOffset = 140
  const angle = props.isOpen
    ? (index / menuItems.length / 1.8) * Math.PI - Math.PI / 2.6
    : -Math.PI / 300
  const x = Math.cos(angle) * (radiusOffset + 40)
  const y = Math.sin(angle) * (radiusOffset + 40) + radiusOffset

  return {
    left: `calc(50% + ${x}px - 24px)`,
    top: `calc(50% + ${y}px - 24px)`,
  }
}
</script>

<template>
  <div>
    <div class="relative">
      <button
        v-for="(item, index) in menuItems"
        :key="item.name"
        v-motion
        :initial="{ scale: 0, opacity: 0 }"
        :enter="{
          scale: isOpen ? 1 : 0,
          opacity: isOpen ? 1 : 0,
          transition: { delay: index * 100 },
        }"
        class="absolute w-12 h-12 rounded-full flex items-center justify-center transition-colors hover:scale-110 active:scale-90"
        :class="[
          activeTab === item.name
            ? 'bg-green-600 text-white'
            : 'bg-gray-700 text-gray-300',
        ]"
        :style="getPosition(index)"
        @click="emit('update:activeTab', item.name)"
      >
        <Icon :name="item.icon" class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>
