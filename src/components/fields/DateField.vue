<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';
import { useFormState } from './useFormState'

const props = defineProps<FieldProps>()

const { useValue } = useFormState()
const { isEditor = false } = useEditorState()
const value = useValue(props)
</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />
    <input type="date" v-model="value" v-bind="field.attrs" />
  </Wrapper>
</template>