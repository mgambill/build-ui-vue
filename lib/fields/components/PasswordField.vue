<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import { useToggle } from '@vueuse/core'
import type { FieldProps } from '.';
import { useFormState } from './useFormState'
import Password from 'primevue/password';

const [isVisible, toggle] = useToggle()
const props = defineProps<FieldProps>()
const { useValue } = useFormState()
const { isEditor } = useEditorState()
const value = useValue<string>(props)
</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />
    <Password v-model="value" :feedback="false" toggleMask />
    <!-- <div
      class="relative border border-control rounded-sm overflow-clip  has-[:focus-visible]:outline has-[:focus-visible]:outline-offset-0 has-[:focus-visible]:outline-black ">
      <input :type="isVisible ? 'text' : 'password'" v-model="value" class="!border-0 focus-visible:outline-none pr-8" />
      <div class="absolute inset-y-0 right-2 flex items-center">
        <button type="button" class="w-4" @click="toggle()">
          <template v-if="isVisible">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="stroke-gray-500">
              <path
              d="M40.4 18L27.8 8.1 8.1 33.4l12.6 9.8L599.8 494.3l12.6 9.8 19.7-25.2L619.5 469 40.4 18zM608 256C578 181.3 478.4 32 320 32c-50.2 0-94.5 15-132.5 37.8l27.1 21.4C245.9 74.4 281.1 64 320 64c68.4 0 125.4 32.1 170 75c39.8 38.3 67.9 83.7 83.2 117c-10.5 22.8-27 51.4-49.3 79.4L549 355.3c28.4-35.8 48.2-72.4 59-99.3zM91 156.7C62.6 192.5 42.8 229.1 32 256c30 74.7 129.6 224 288 224c50.2 0 94.5-15 132.5-37.8l-27.1-21.4C394.1 437.6 358.9 448 320 448c-68.4 0-125.4-32.1-170-75c-39.8-38.3-67.9-83.7-83.2-117c10.5-22.8 27-51.4 49.3-79.4L91 156.7zM320 384c16.7 0 32.7-3.2 47.4-9.1l-30.9-24.4c-5.4 .9-10.9 1.4-16.5 1.4c-51 0-92.8-39.8-95.8-90.1l-30.9-24.4c-.9 6-1.3 12.2-1.3 18.5c0 70.7 57.3 128 128 128zM448 256c0-70.7-57.3-128-128-128c-16.7 0-32.7 3.2-47.4 9.1l30.9 24.4c5.4-.9 10.9-1.4 16.5-1.4c51 0 92.8 39.8 95.8 90.1l30.9 24.4c.9-6 1.3-12.2 1.3-18.5z" />
            </svg>
          </template>
          <template v-else>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="stroke-gray-500">
              <path
                d="M118 373c-39.8-38.3-67.9-83.7-83.2-117c15.3-33.3 43.4-78.6 83.2-117c44.6-42.9 101.5-75 170-75s125.4 32.1 170 75c39.8 38.3 67.9 83.7 83.2 117c-15.3 33.3-43.4 78.6-83.2 117c-44.6 42.9-101.5 75-170 75s-125.4-32.1-170-75zM288 480c158.4 0 258-149.3 288-224C546 181.3 446.4 32 288 32S30 181.3 0 256c30 74.7 129.6 224 288 224zM192 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" />
            </svg>
          </template>
        </button>
      </div>
    </div> -->
  </Wrapper>
</template>