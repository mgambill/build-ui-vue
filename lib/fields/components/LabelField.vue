<script setup lang="ts">
import InlineContent from '@/components/ui/InlineContent.vue';
import { useEditorState } from '@/components/EditorProvider'
import Label from '@/components/ui/Label.vue'
import type { FieldProps } from '.';

const { field, fields } = defineProps<FieldProps>()
const { isEditor = false, updateField } = useEditorState()
const label = computed({
  get: () => {
    return field.label?.text ?? ''
  },
  set: (value: string) => {
    updateField({ ...toValue(field), label: { text: value } }, fields)
  },
})
</script>

<template>
  <template v-if="isEditor && field">
    <InlineContent v-model="label" class="text-sm font-medium text-gray-700" />
  </template>
  <template v-else>
    <Label class="mb-1" data-field="label">{{ field.label?.text }}</Label>
  </template>
</template>