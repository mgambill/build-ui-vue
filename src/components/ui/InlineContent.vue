<script setup lang="ts" generic="TOption">
import { PencilIcon } from '@heroicons/vue/20/solid'
import { twMerge } from 'tailwind-merge'
type Props = {
  showCaret?: boolean
  placeholder?: string
  title?: string
  min?: number
  step?: number
  max?: number
  format?: string
  enabled?: boolean
}

const { showCaret = false, placeholder = "None", title = "Enter Text", enabled = true } = defineProps<Props>()
let beforeEditCache: any = null
const editMode = ref(false)
const modelValue = defineModel<number | string | Date>()
const onSelect = () => {
  beforeEditCache = modelValue.value
  editMode.value = true
}
const doneEdit = () => {
  editMode.value = false
}
const cancelEdit = (e) => {
  modelValue.value = beforeEditCache
  editMode.value = false
  nextTick(() => {
    e.target.blur()
  })
}
const onInput = (e: Event) => {
  modelValue.value = (e.target as HTMLElement).innerText
}

const isEmptyText = computed(() => String(modelValue.value).length === 0)
const modelValueDisplay = computed(() => isEmptyText.value ? placeholder : modelValue.value)

</script>

<template>
  <div :class="twMerge('inline-block', $attrs.class as any)">
    <div
      :class="[showCaret ? 'grid grid-cols-[auto,1rem] gap-1' : '', enabled && 'group block relative has-[*:focus]:outline-offset-2 has-[*:focus]:outline has-[*:focus]:outline-sky-200/5 has-[*:focus]:ring-1 has-[*:focus]:ring-sky-200 hover:bg-sky-50 dx:outline-none has-[*:focus]:z-20']">
      <template v-if="enabled">
        <span class="w-full" type="text" data-ic="text" :data-ic-empty="isEmptyText" contenteditable @click="onSelect"
          @blur="doneEdit" @input="onInput" @keyup.enter="doneEdit" @keyup.escape="cancelEdit" :title="title">{{
            modelValueDisplay }}</span>
        <span v-if="showCaret"
          class="pointer-events-none flex items-center opacity-30 group-hover:opacity-100 transition">
          <slot name="icon">
            <PencilIcon class="w-4 h-4 text-gray-400" aria-hidden="true" />
          </slot>
        </span>
      </template>
      <template v-else>
        {{ modelValue }}
      </template>
    </div>
    <pre v-if="false">{{ { modelValue, isEmptyText, modelValueDisplay } }}</pre>
  </div>
</template>
