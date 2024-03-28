<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import type { FieldProps } from '.';
import { twMerge } from 'tailwind-merge';
type Props = {
  block?: boolean
}
const { block = false, props } = defineProps<FieldProps & Props>()
const { isEditor = false, selectField } = useEditorState()
const onClick = () => {
  if (props && props.field)
    selectField(props.field)
}
</script>

<template>
  <div class="relative"
    :class="twMerge([isEditor && 'hover:ring-1 hover:ring-sky-400  hover:ring-offset-8 hover:shadow-sm'], $attrs.class as any)"
    @click.stop="onClick">
    <template v-if="block">
      <div class="absolute inset-0 ">
      </div>
      <slot />
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>