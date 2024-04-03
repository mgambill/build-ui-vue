<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import Wrapper from './Wrapper.vue'
import LabelField from './LabelField.vue';
import type { FieldProps, Option } from '.';
import { useFormState } from './useFormState'
import Dropdown from 'primevue/dropdown';

const props = defineProps<FieldProps>()

const { isEditor = false } = useEditorState()
const { useValue } = useFormState()
const value = useValue<Option>(props)


</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />

    <Dropdown v-model="value" :options="field.options" optionLabel="label"
        placeholder="Select a City" class="w-full md:w-14rem">

      <!-- <template v-for="option in field.options" :key="option.value">
        <template v-if="'group' in option && option.group">
          <optgroup :label="option.group">
            <template v-for="o in option.options" :key="o.value">
              <option v-if="'value' in o && 'label' in o" :value="o.value">{{ o.label }}</option>
            </template>
          </optgroup>
        </template>
        <template v-else-if="'value' in option">
          <option :value="option.value">{{ option.label }}</option>
        </template>
      </template> -->
    </Dropdown>
  </Wrapper>

</template>
