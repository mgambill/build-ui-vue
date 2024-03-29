<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';
import { useFormState } from './useFormState'

const props = defineProps<FieldProps>()
const { useValue } = useFormState()

const { isEditor = false } = useEditorState()
const value = useValue<string>(props)
</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />
    <label class="grid grid-cols-[auto,1fr]">

      <div class="p-1">
        <input type="checkbox" :name="`fld-${field.id}`" v-model="value" :value="true"
          class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
      </div>
      {{ field.content }}
    </label>
  </Wrapper>
</template>