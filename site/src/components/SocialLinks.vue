<script setup lang="ts">
defineProps<{
  direction?: "horizontal" | "vertical";
}>();

const socialLinks = [
  {
    icon: "/images/linkedin.svg",
    url: "https://www.linkedin.com/in/janhoon",
    label: "LinkedIn profile",
  },
  {
    icon: "/images/github_light.svg",
    url: "https://github.com/janhoon",
    label: "GitHub profile",
  },
  {
    icon: "/images/x_light.svg",
    url: "https://x.com/janhendrikhoon",
    label: "X (Twitter) profile",
  },
];
</script>

<template>
  <nav
    class="flex gap-2"
    :class="direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'"
    aria-label="Social links"
  >
    <a
      v-for="link in socialLinks"
      :key="link.url"
      :href="link.url"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="link.label"
      class="focus-ring inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-slate-700 hover:text-teal-700 hover:border-teal-700/30 transition-colors"
    >
      <img
        :src="link.icon"
        alt=""
        width="16"
        height="16"
        class="w-4 h-4"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />
      <span class="text-sm font-semibold">{{ link.label.split(" ")[0] }}</span>
    </a>
  </nav>
</template>
