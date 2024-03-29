<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import InlineContent from '@/components/ui/InlineContent.vue'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps, Option } from '.';
import { useFormState } from './useFormState'
const props = defineProps<FieldProps>()
const { useValue } = useFormState()
const { isEditor = false } = useEditorState()
const onUpdate = (e) => {
  console.log('onUpdate', e)
  temp.value = e.target.value
}
const onSubmit = () => {
  addOption(props.field, temp.value)
  onCancel()
}
const emptyOther = { label: 'Other', value: 'Other' }
const onCancel = () => {
  temp.value = ""
}
const temp = ref<string>('')
const direction = props.field.props?.direction ?? 'horizontal'
const value = useValue<Option>(props)
const allowOther = props.field.props?.allowOther
const isOther = computed(() => allowOther && value.value === emptyOther.value)
watchEffect(() => {
  value.value = (isOther.value) ? emptyOther : null
})
const options = computed(() => {
  if (props.field.props?.allowOther) {
    return [props.field.options, emptyOther]
  }
  return props.field.options
})
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
              <input type="radio" :name="`option-${op.value}`" v-model="value" :value="op"
                class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <InlineContent v-model="op.label" />
              <button @click="e => removeOption(field, op)"
                class="hover:text-red-600 rounded-full w-6 h-6 flex items-center justify-center leading-none">&times;</button>
            </div>
          </template>
          <template v-else>
            <div class="flex items-center gap-1.5">
              <input type="radio" :name="`fld-${field.id}`" :id="`option-${field.id}-${op.value}`" v-model="value"
                :value="op" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label :for="`option-${field.id}-${op.value}`">{{ op.label }}</label>
            </div>
          </template>
        </template>

        <!-- <template v-if="props.field.props?.allowOther">
          <div class="flex items-center gap-1.5">
            <input type="radio" v-model="isOther" :name="`fld-${field.id}`" :id="`option-${field.id}-other`"
              value="Other" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <label :for="`option-${field.id}-other`">Other</label>
          </div>
        </template> -->

        <template v-if="isEditor && field">
          <template v-if="props.field.options?.length === 0">
            <div class="italic text-gray-500 mb-1 animate-pulse">No items added...</div>
          </template>
          <hr />
          <div class="flex items-center gap-1.5 py-1">
            <span class="h-4 w-3 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
            <input :value="temp" @change="onUpdate" @keyup.esc="onCancel" @keyup.enter="onSubmit"
              placeholder="Add New Item" class="bg-zinc-100 block flex-1 p-1" />
          </div>
        </template>
      </div>
    </fieldset>
  </Wrapper>
</template>