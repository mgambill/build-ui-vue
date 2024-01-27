<script setup lang="ts">
import { EditorInjectionKey } from '@/components/EditorProvider'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import { useToggle } from '@vueuse/core'
import type { FieldProps } from '.';

const [isVisible, toggle] = useToggle()
const props = defineProps<FieldProps>()
const value = ref()
const { isEditor = false } = inject(EditorInjectionKey) ?? {}

</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />
    <div
      class="relative border border-control rounded-sm overflow-clip  has-[:focus-visible]:outline has-[:focus-visible]:outline-offset-0 has-[:focus-visible]:outline-black ">
      <input :type="isVisible ? 'text' : 'password'" v-model="value" class="!border-0 focus-visible:outline-none" />
      <div class="absolute inset-y-0 right-2 flex items-center">
        <button class="absolute right-2" @click="toggle()">
          <template v-if="isVisible">*</template>
          <template v-else>+</template>
        </button>
      </div>
    </div>
  </Wrapper>
</template>