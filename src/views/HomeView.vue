<script setup lang="ts">
import { type PathwayTemplate } from '@/components/EditorProvider'
import EditorView from '@/components/EditorView.vue';
import DATASET from '../components/ControlsForm'
const datasource = ref<PathwayTemplate>(DATASET)

const currentStep = ref(datasource.value.steps[0])


</script>

<template>
  <main class=" bg-stone-50 max-w-screen-lg  mx-auto p-8">
    <EditorView v-model="datasource" />
  </main>
</template>
