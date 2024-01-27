<script setup lang="ts">
import { EditorInjectionKey } from '@/components/EditorProvider'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';

const props = defineProps<FieldProps>()

const { isEditor = false } = inject(EditorInjectionKey) ?? {}
</script>

<template>
  <Wrapper v-bind="props" >

    <p class="text-sm text-gray-500" v-if="isEditor">Divider</p>
    <div class="editor:p-2 relative">
      <template v-if="field.label?.text">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="bg-white px-2 text-sm text-gray-500">{{ field.label.text }}</span>
        </div>
      </template>
      <template v-else>
        <hr class="border-t border-gray-300" />
      </template>
    </div>
  </Wrapper>
</template>