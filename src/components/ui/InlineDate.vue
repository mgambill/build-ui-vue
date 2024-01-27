<script setup lang="ts" generic="TOption">
import InlineEdit from './InlineEdit.vue'
import InlineEditLabel from './InlineEditLabel.vue'
import DateInput from "./DateInput.vue"
import { useDateFormat} from "@vueuse/core"
type Props = {
  showCaret?: boolean
  emptyText?: string
  title?: string
  format?: string
}
const { showCaret = false, emptyText = "None", format = "YYYY-MM-DD" } = defineProps<Props>()
const modelValue = defineModel<string | Date>()

const modelValueDisplay = computed(() => {
  if (modelValue.value === undefined) return emptyText
  if (String(modelValue.value).length === 0) return emptyText

  const modelValueDate = typeof modelValue.value === "string" ? new Date(modelValue.value) : modelValue.value

  return useDateFormat(modelValueDate, format ).value
})
</script>

<template>
  <InlineEdit title="Enter a date / time" v-model="modelValue" :show-caret="showCaret">
    <template v-slot:edit="{doneEdit, cancelEdit}">
      <div class="absolute left-0 inline min-w-[2rem]">
        <DateInput class="w-full p-0 pl-0.5 bg-white" v-model="modelValue"
          @vue:mounted="({ el }) => el.focus()" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.escape="cancelEdit"
          :title="title" />
      </div>
    </template>
    <template v-slot="{select}">
      <InlineEditLabel @select="select">
        {{  modelValueDisplay }}
      </InlineEditLabel>
    </template>
  </InlineEdit>
</template>
