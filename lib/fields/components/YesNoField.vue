<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import InlineContent from '@/components/ui/InlineContent.vue'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.'
import { useFormState } from './useFormState'
import RadioButton from 'primevue/radiobutton'

const props = defineProps<FieldProps>()

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
const direction = props.field.props?.direction ?? 'horizontal'
</script>

<template>
  <Wrapper v-bind="props">
    <fieldset>
      <legend class="mb-1">
        <LabelField v-bind="props" />
      </legend>

      <div :class="direction ? 'flex gap-4' : 'flex flex-col gap-4'">
        <template
          v-for="op in [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
          ]"
          :key="op"
        >
          <template v-if="isEditor && field">
            <div class="flex items-center gap-1 hover:bg-sky-50">
              <input type="radio" :name="`option-${field.property ?? field.id}-${op.value}`" v-model="value" :value="op.value" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <InlineContent v-model="op.label" />
            </div>
          </template>
          <template v-else>
            <div class="flex items-center gap-1.5">
              <RadioButton v-model="value" :inputId="`option-${field.property ?? field.id}-${op.value}`" :name="`fld-${field.id}`" :value="op.value" />
              <!-- <input type="radio" :name="`fld-${field.id}`" :id="`option-${field.id}-${op.value}`" v-model="value" :value="op.value"
                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" /> -->
              <label :for="`option-${field.property ?? field.id}-${op.value}`">{{ op.label }}</label>
            </div>
          </template>
        </template>
      </div>
    </fieldset>
  </Wrapper>
</template>
