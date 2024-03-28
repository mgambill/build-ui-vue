<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';
import FieldCollectionResolver from './FieldCollectionResolver.vue';
import HeadingField from './HeadingField.vue';

const { field, index, depth, ...props } = defineProps<FieldProps>()
const { isEditor = false } = useEditorState()

</script>

<template>
  <Wrapper v-bind="{ field, index, depth, ...props }">
    <div class="border p-5 bg-white">
      <HeadingField :field class="text-2xl font-light text-zinc-800 my-0" />
      <hr class="my-2" />
      <FieldCollectionResolver :field :index :depth
        class="flex flex-col gap-2 editor:border-dashed editor:border editor:border-zinc-400" />
      <template v-if="isEditor">
        <p v-if="isEditor" class="italic text-gray-400 p-1">No Fields have been added to this row</p>
      </template>
    </div>
  </Wrapper>
</template>