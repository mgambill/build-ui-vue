<script setup lang="ts">
import { EditorInjectionKey } from '@/components/EditorProvider'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';
import FieldsResolver from './FieldsResolver.vue';

const props = defineProps<FieldProps>()
const value = ref()
const { isEditor = false } = inject(EditorInjectionKey) ?? {}
</script>

<template>
  <Wrapper v-bind="props" class="flex gap-2 editor:border-dashed editor:border editor:border-zinc-400">
    
    <FieldsResolver :fields="field.fields" />
    <template v-if="isEditor">
      <p v-if="isEditor" class="italic text-gray-400 p-1">No Fields have been added to this row</p>
    </template>
  </Wrapper>
</template>