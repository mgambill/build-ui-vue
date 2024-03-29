<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
 import { useFormState } from './useFormState'
import type { FieldProps } from '.';

const props = defineProps<FieldProps>()
const { useValue } = useFormState()
const { isEditor = false } = useEditorState()
const value = useValue<string>(props)


</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />

    <select name="" id="" v-model="value">
      <template v-for="o in field.options" :key="o.label">
        <template v-if="'group' in o && o.group && o.options">
          <optgroup :label="o.group">
            <template v-for="co in o.options" :key="co.value">
              <option :value="co">{{ co.label }}</option>
            </template>
          </optgroup>
        </template>
        <template v-else>
          <option :value="o">{{ o.label }}</option>
        </template>

      </template>
    </select>


  </Wrapper>
</template>
