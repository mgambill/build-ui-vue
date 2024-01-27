<script setup lang="ts">
import { EditorInjectionKey } from '@/components/EditorProvider'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';

const props = defineProps<FieldProps>()
const value = ref()
const { isEditor = false } = inject(EditorInjectionKey) ?? {}

</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />
    <input type="number" v-model="value" :step="field.props?.step" :min="field.props?.min" :max="field.props?.max" />
  </Wrapper>
</template>