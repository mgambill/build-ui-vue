<script setup lang="ts">
import { useProvideEditorState } from '@/components/EditorProvider'
useProvideEditorState(false, undefined)
</script>

<template>
  <RouterView />
</template>
