<script setup lang="ts" generic="TOption">
import { inlineEditStateKey, type InlineEditState } from './InlineEditState'
import { PencilIcon } from '@heroicons/vue/20/solid'

type Prop = {
  modelValueDisplay?: (() => string) | string | Date | number
}
const props = defineProps<Prop>()
const modelValueDisplay = computed(() => {
  if (props.modelValueDisplay !== undefined && props.modelValueDisplay) props.modelValueDisplay
  if (modelValue.value === undefined) return emptyText
  if (String(modelValue.value).length === 0) return emptyText
  return modelValue.value
})
let showCaret = true
let { editMode, emptyText,  modelValue } = inject(inlineEditStateKey) as InlineEditState

const emits = defineEmits(['select'])
</script>

<template>
  <a @click.prevent="emits('select')" class="relative inline-grid grid-cols-[auto,1rem] gap-1 h-8 items-center outline outline-1 outline-green-600" data-anchor
    :class="['cursor-pointer', editMode && 'invisiblce whitespace-pre']">
    <slot :value="modelValue">{{ modelValueDisplay }}</slot>
    <span v-if="showCaret"
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center opacity-30 group-hover:opacity-100 transition">
      <slot name="icon">
        <PencilIcon class="w-4 h-4 text-gray-400" aria-hidden="true" />
      </slot>
    </span>
  </a>
</template>
