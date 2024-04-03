<script setup lang="ts">
import type { ParentConfig } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import FieldResolver from './FieldResolver.vue'

import type { FieldProps } from './';


const { field, depth } = defineProps<FieldProps>()

// const emits = defineEmits()
// const [
//   el,
//   items] =
//   useDragAndDrop(field.fields ?? [], {
//     accepts: (prev, curr) => {
//       console.log(prev, curr)
//       return true;
//     }
//   })
</script>

<template>
  <div   v-if="field.fields">
    <template v-for="(f, index) in field.fields" :key="f.id">
      <FieldResolver :field="f" :index :depth="depth + 1" />
    </template>
  </div>
</template>