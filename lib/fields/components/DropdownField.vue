<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import Wrapper from './Wrapper.vue'
import LabelField from './LabelField.vue'
import type { FieldProps, Option } from '.';
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { useFormState } from './useFormState'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps<FieldProps>()

const { isEditor = false } = useEditorState()
const { useValue } = useFormState()
const value = useValue<Option>(props)


</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />

    <Listbox v-model="value">
      <div class="relative mt-1 z-10">
        <ListboxButton
          class="relative w-full border border-control cursor-default rounded-sm bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span class="block truncate">{{ value?.label ?? 'No Value Selected' }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <i class="fa fa-fw fa-chevron-down text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            <template v-for="option in field.options" :key="option.name">
              <ListboxOption v-slot="{ active, selected }" :value="option" as="template">
                <li
                  :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-10 pr-4',]">
                  <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate',]">{{ option.label
                    }}</span>
                  <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <i class="fa fa-fw fa-check" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </template>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </Wrapper>
</template>
