<script setup lang="ts" generic="TOption extends string | number | boolean | object | null | undefined">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import Calendar from "@/components/Calendar.vue"
import { CalendarIcon } from '@heroicons/vue/20/solid'

import { type PredicateOrKey, createResolver, empty } from '@/useResolver'
type Props = {
  showCaret?: boolean
  emptyText?: string,
  format?: 'full' | 'long' | 'medium' | 'short'
}
const { emptyText = "No Date", showCaret = false, format = 'short' } = defineProps<Props>()
const modelValue = defineModel<Date | string>()
const modelValueDate = computed(() => typeof modelValue.value === "string" ? new Date(modelValue.value) : modelValue.value)

const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: 'long' })
const display = computed(() => modelValueDate.value ? format === 'short' ? modelValueDate.value?.toISOString().substring(0,10) : formatter.format(modelValueDate.value) : emptyText)

</script>

<template>

    <Popover as="span" class="relative group">
      <PopoverButton class="text-blue-500 font-bold  group-hover:bg-white inline-flex relative" :class="showCaret && 'pr-6'">
        <span class="block truncate">

          <slot>
            {{ display }}
          </slot>

        </span>
        <span v-if="showCaret"
          class="pointer-events-none absolute inset-y-0 right-0 flex bg-white items-center opacity-30 group-hover:opacity-100 transition">
          <CalendarIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </PopoverButton>

      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
        <PopoverPanel v-slot="{close}"
          class="absolute left-0 z-20 mt-1 max-h-96 w-72 h-96 overflow-hidden rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <Calendar v-model="modelValue" @select="close" />
        </PopoverPanel>
      </transition>
    </Popover>

</template>

