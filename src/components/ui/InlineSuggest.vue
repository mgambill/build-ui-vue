<script setup lang="ts" generic="TOption">
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
} from '@headlessui/vue'
import InlineEdit from '@/components/InlineEdit.vue'
import InlineEditLabel from '@/components/InlineEditLabel.vue'

import { MagnifyingGlassIcon, BoltIcon } from '@heroicons/vue/20/solid'
type Predicate<T, Result = boolean> = (item: T) => Result
type Props = {
  showCaret?: boolean
  type?: 'input' | 'select' | 'boolean',
  options: TOption[]
  optionLabel?: Predicate<TOption, string | number>
}
const { options = [], optionLabel = (item) => item, showCaret = false } = defineProps<Props>()
const modelValue = defineModel()
const multiple = computed(() => Array.isArray(modelValue.value))
const query = defineModel('query')

let beforeEditCache: any = null
const editMode = ref(false)
const onSelect = () => {
  beforeEditCache = modelValue.value
  editMode.value = true
}


</script>

<template>
  <InlineEdit>
    <template v-slot:edit="{ cancelEdit }">
      <div class="fixed inset-0 " @click="editMode = false"></div>
      <div class="absolute z-20 left-0 bottom-0 translate-y-full w-48 bg-white ring-1 rounded ring-zinc-300">
        <Combobox v-model="modelValue" :multiple="multiple">

          <div class="relative">
            <ComboboxInput
              class="w-full rounded-md border-0 bg-gray-100 px-4 pl-2.5 pr-6 text-gray-900 focus:ring-0 sm:text-sm"
              placeholder="Search..." @change="query = $event.target.value" :displayValue="(person) => person.name"
              @keyup.escape="cancelEdit" />
            <div class="absolute z-10 right-2 flex items-center inset-y-0">
              <MagnifyingGlassIcon class="w-5 h-5 text-zinc-500" />
            </div>
          </div>
          <ComboboxOptions v-if="options.length > 0" static
            class="mt-1  max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800 p-0.5">
            <slot name="items" />
          </ComboboxOptions>

          <div v-if="query !== '' && options.length === 0"
            class="px-4 py-14 text-center sm:px-14 mt-1 bg-white ring-1 rounded p-0.5">
            <slot name="empty">
              <p class="mt-4 text-sm text-gray-900">No results found using that search term.</p>
            </slot>
          </div>
        </Combobox>
      </div>
    </template>
    <template v-slot="{ select }">
      <InlineEditLabel @select="select">
        <template #icon>
          <BoltIcon class="w-4 h-4 text-gray-400" aria-hidden="true" />
        </template>
      </InlineEditLabel>
    </template>
  </InlineEdit>
</template>
