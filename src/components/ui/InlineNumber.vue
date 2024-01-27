<script setup lang="ts" generic="TOption">

import InlineEdit from '@/components/InlineEdit.vue'

type Props = {
  showCaret?: boolean
  emptyText?: string
  title?: string
  min? : number
  step? : number
  max? : number
  format?: string
}
const { showCaret = false, emptyText = "None", title = "Enter a number.", min, max, step } = defineProps<Props>()
const modelValue = defineModel<number>()
</script>

<template>
  <InlineEdit :title="title" v-model="modelValue" :showCaret="showCaret" :emptyText="emptyText">
    <template v-slot:edit="{doneEdit, cancelEdit}">
      <div class="absolute left-0 inline min-w-fit">
        <input class="w-full min-w-[3rem] p-0 bg-white" type="number" v-model.number="modelValue" :step="step" :min="min" :max="max"
          @vue:mounted="({ el }) => el.focus()" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.escape="cancelEdit"
          :title="title" />
      </div>
    </template>
  </InlineEdit>
</template>
