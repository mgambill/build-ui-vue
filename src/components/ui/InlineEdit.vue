<script setup lang="ts" generic="TOption">
import { inlineEditStateKey } from './InlineEditState'
import InlineEditLabel from './InlineEditLabel.vue'

type Props = {
  showCaret?: boolean

  emptyText?: string
  title?: string
}
const { showCaret = false, emptyText = "None", title = "" } = defineProps<Props>()
const modelValue = defineModel<number | string | Date>()
let beforeEditCache: any = null
const editMode = ref(false)

const onSelect = () => {
  beforeEditCache = modelValue.value
  editMode.value = true
}
const doneEdit = () => {
  editMode.value = false
}
const cancelEdit = () => {
  modelValue.value = beforeEditCache
  editMode.value = false
}

const modelValueDisplay = computed(() => {
  if (String(modelValue.value).length === 0) return emptyText
  return modelValue.value
})

provide(inlineEditStateKey, { modelValue, editMode,  emptyText, showCaret, title, modelValueDisplay } )

</script>

<template>
  <span class="relative group outline outline-1 outline-blue-600 h-8">
    <template v-if="editMode">
      <slot name="edit" :doneEdit="doneEdit" :cancelEdit="cancelEdit" />
    </template>
    <slot :select="onSelect">
      <InlineEditLabel @select="onSelect" :modelValueDisplay="modelValueDisplay"/>
    </slot>
  </span>
</template>
