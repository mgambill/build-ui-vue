<script setup lang="ts">
import Sidebar from './partials/Sidbar.vue'
type Props = {
  title?: string
}
const { title } = defineProps<Props>()
</script>

<template>
  <Sidebar />

  <div class="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
    <!-- Page Heading -->
    <header>
      <p class="mb-2 text-sm font-semibold text-blue-500">Starter Pages & Examples</p>
      <h1 class="block text-2xl font-bold text-gray-800 sm:text-3xl dark:text-white" v-if="title">{{ title }}</h1>


    </header>
    <div class="text-slate-800 dark:text-slate-400 mt-4">
      <!-- End Page Heading -->
      <slot />
    </div>
  </div>
</template>
