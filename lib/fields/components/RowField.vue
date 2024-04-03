<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';
import FieldCollectionResolver from './FieldCollectionResolver.vue';

const { field, index, depth, ...props } = defineProps<FieldProps>()
const value = ref()
const { isEditor = false } = useEditorState()
</script>

<template>
  <Wrapper v-bind="{ field, index, depth, ...props }"
   >

    <FieldCollectionResolver :field :index :depth class="flex gap-2 editor:border-dashed editor:border editor:border-zinc-400 *:flex-1 mb-2" />
    <template v-if="isEditor">
      <p v-if="isEditor" class="italic text-gray-400 p-1">No Fields have been added to this row</p>
    </template>
  </Wrapper>
</template>