<script setup lang="ts" generic="TOption">

import InlineEdit from './InlineEdit.vue'
type Props = {
  showCaret?: boolean
  emptyText?: string
  title?: string
  min? : number
  step? : number
  max? : number
  format?: string
}
const { showCaret = false, emptyText = "None", title = "Enter Text" } = defineProps<Props>()
const modelValue = defineModel<string>()
</script>

<template>
  <InlineEdit :title="title" v-model="modelValue" :showCaret="showCaret" :emptyText="emptyText">
    <template v-slot:edit="{doneEdit, cancelEdit}">
      <div class="absolute inset-0 inline min-w-0 outline outline-1 outline-red-600 h-8">

        <input class="w-full bg-white" type="text" data-ic="text" v-model="modelValue"
          @vue:mounted="({ el }) => el.focus()" @blurx="doneEdit" @keyup.enter="doneEdit" @keyup.escape="cancelEdit"
          :title="title" />
      </div>
    </template>
  </InlineEdit>

</template>
