<script setup lang="ts">
import { EditorInjectionKey } from '@/components/EditorProvider'
import type { FieldProps } from '.';
import { twMerge } from 'tailwind-merge';

const props = defineProps<FieldProps>()
const { isEditor = false, removeOption, addOption } = inject(EditorInjectionKey)!

</script>

<template>
  <div class="relative"
    :class="twMerge([isEditor && 'hover:ring-1 hover:ring-sky-400  hover:ring-offset-8 hover:shadow-sm' ], $attrs.class as any)">
    <slot />
  </div>
</template>