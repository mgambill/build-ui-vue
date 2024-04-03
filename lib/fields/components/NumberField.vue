<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';
import { useFormState } from './useFormState'
import InputNumber from 'primevue/inputnumber';
const props = defineProps<FieldProps>()
const { useValue } = useFormState()
const { isEditor = false } = useEditorState()
const value = useValue(props)
</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />
    <InputNumber v-model.number="value" :step="field.props?.step" :min="field.props?.min"
      :max="field.props?.max" />
  </Wrapper>
</template>