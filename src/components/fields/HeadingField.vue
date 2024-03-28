<script setup lang="ts">
import InlineContent from '../ui/InlineContent.vue';
import { twMerge } from 'tailwind-merge';
import { useEditorState } from '@/components/EditorProvider'
import Label from '@/components/ui/Label.vue'
import type { FieldProps } from '.';

const { field } = defineProps<{ field: FieldProps['field'] }>()
const { isEditor = false, updateField } = useEditorState()

</script>

<template>
  <template v-if="isEditor && field">
    <!-- <InlineContent v-model="field.label.text" class="text-xl font-light text-gray-700" /> -->
  </template>
  <template v-else>
    <p :class="twMerge('text-lg my-1', $attrs.class as any)">{{ field.label?.text }}</p>
  </template>
</template>