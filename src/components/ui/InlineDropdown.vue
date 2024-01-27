<script setup lang="ts" generic="TOption extends string | number | boolean | object | null | undefined">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/20/solid'
import { type PredicateOrKey, createResolver, empty } from '@/useResolver'
type Props = {
  showCaret?: boolean
  options?: TOption[],
  optionKey?: PredicateOrKey<TOption>,
  optionLabel?: PredicateOrKey<TOption>
  emptyText?: string
}
const { options, optionLabel, optionKey, emptyText = "None", showCaret = false } = defineProps<Props>()
const modelValue = defineModel()
const labelResolver = createResolver(optionLabel)
const keyResolver = createResolver(optionKey)

const multiple = computed(() => Array.isArray(modelValue.value))


</script>

<template>
  <span class="relative group">
    <Listbox v-model="modelValue" :multiple="multiple">
      <ListboxButton class="text-blue-500 font-bold  group-hover:bg-white " :class="showCaret && 'pr-5'">

        <span class="block truncate">
          <template v-if="multiple && modelValue.length === 0 && $slots.empty">
            <slot name="empty"><span class="text-blue-500 font-bold">{{ emptyText }}</span></slot>
          </template>
          <template v-else>
            <slot>
              {{ multiple ? modelValue.length === 0 ? labelResolver(empty) : modelValue.map(labelResolver).join(', ') :
                labelResolver(modelValue) }}
            </slot>
          </template>
        </span>
        <span v-if="showCaret"
          class="pointer-events-none absolute inset-y-0 right-0 flex bg-white items-center opacity-30 group-hover:opacity-100 transition">
          <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>


      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute left-0 z-20 mt-1 max-h-60 min-w-fit w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption v-slot="{ active, selected }" v-for="item in options" :key="keyResolver(item)" :value="item"
            as="template">
            <slot name="item" :active="active" :selected="selected" :multiple="multiple" :item="item">
              <li :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                multiple ? 'pl-10 pr-4' : 'px-4',
                'relative cursor-default select-none py-2',
              ]">
                <span :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]">{{ labelResolver(item) ?? item }}</span>
                <span v-if="selected && multiple" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </slot>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </span>
</template>
