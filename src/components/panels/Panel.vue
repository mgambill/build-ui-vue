<script setup lang="ts">
type Props = { title: string }
const { title } = defineProps<Props>()
// const emits = defineEmits()
</script>

<template>
  <details>
    <summary>{{ title }}</summary>
    <slot></slot>
  </details>
</template>
