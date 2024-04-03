<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';
import { useFormState } from './useFormState'
import Checkbox from 'primevue/checkbox';
const props = defineProps<FieldProps>()
const { useValue } = useFormState()

const { isEditor = false } = useEditorState()
const value = useValue<boolean>(props, false)
</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />
    <label class="grid grid-cols-[auto,1fr]">

      <div class="p-2">
        <Checkbox :input-id="`fld-${field.id}`" v-model="value" />
      </div>
      {{ field.content }}
    </label>
  </Wrapper>
</template>