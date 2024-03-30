<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import InlineContent from '@/components/ui/InlineContent.vue'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.'
import { useFormState } from './useFormState'

type YesNoProps = {
  yesText?: string
  noText?: string
  allowEmpty: boolean
  direction?: string
}

const props = defineProps<FieldProps<YesNoProps>>()
const { yesText = 'Yes', noText = 'No', allowEmpty = false, direction = 'horizontal' } = props.field.props ?? {}

const { useValue } = useFormState()
const { isEditor = false } = useEditorState()
const value = useValue<string>(props)
const onUpdate = (e) => {
  console.log('onUpdate', e)
  temp.value = e.target.value
}
const onSubmit = () => {
  addOption(props.field, temp.value)
  onCancel()
}

const onCancel = () => {
  temp.value = ''
}
const temp = ref<string>('')
const yesOption = { label: yesText ?? 'Yes', value: true }
const noOption = { label: noText ?? 'No', value: false }
const emptyOption = { label: 'N/A', value: null }
const options = allowEmpty ? [yesOption, noOption, emptyOption] : [yesOption, noOption]
</script>

<template>
  <Wrapper v-bind="props">
    <fieldset>
      <legend class="mb-1">
        <LabelField v-bind="props" />
      </legend>

      <div :class="direction ? 'flex gap-4' : 'flex flex-col gap-4'">
        <template v-for="op in options" :key="op">
          <template v-if="isEditor && field">
            <div class="flex items-center gap-1 hover:bg-sky-50">
              <input type="radio" :name="`option-${field.id}-${op.value}`" v-model="value" :value="op.value" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <InlineContent v-model="op.label" />
            </div>
          </template>
          <template v-else>
            <label class="flex items-center gap-1.5">
              <input type="radio" :name="`fld-${field.id}`" :id="`option-${field.id}-${op.value ?? 'null'}`" v-model="value" :value="op.value" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              {{ op.label }}</label
            >
          </template>
        </template>
      </div>
    </fieldset>
  </Wrapper>
</template>
