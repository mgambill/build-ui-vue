<script setup lang="ts">
import Panel from './Panel.vue'
// type Props = { }
// const { } = defineProps<Props>()
// const emits = defineEmits()
import { useEditorState } from '../EditorProvider'
const { currentField } = useEditorState()
</script>

<template>
  <Panel title="Pathway Steps">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis voluptates aliquam voluptas harum molestias?
      Nemo dolores earum dignissimos rerum deserunt beatae voluptatum qui necessitatibus dicta eveniet? Quod dolore
      iusto nesciunt?</p>
    <pre>{{ currentField }}</pre>
  </Panel>
</template>
