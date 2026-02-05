<template>
  <div class="bg-gray-800 text-gray-100 antialiased min-h-screen">
    <div class="flex flex-col items-center justify-center w-full">
      <div class="flex flex-col items-start justify-center sm:w-2/3 w-full px-4">
        <div class="flex flex-row items-center justify-between w-full py-4">
          <NuxtLink to="/blog" class="flex flex-row items-end gap-2">
            <span class="text-4xl font-bold">Jan Hoon</span>
            <span class="text-2xl">blog</span>
          </NuxtLink>
          <NuxtLink to="/" class="text-sm text-green-600">
            <Icon name="lucide:home" class="w-6 h-6" />
          </NuxtLink>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>
