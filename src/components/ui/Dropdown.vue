<script setup lang="ts" generic="T">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { isEqual } from 'lodash-es'
import { twMerge } from 'tailwind-merge'

type DropdownOption<T> = {
  label: string
  value: T
  icon?: string
}

type Props<T extends DropdownOption<T>> = {
  multiple?: boolean
  label?: string
  modelValue: T
  valueField?: keyof T
  labelField?: keyof T
  options: T[]
  Separator?: string
  activeClass?: string
  selectedClass?: string
  menuClass?: string
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { Separator = ', ', label = 'Select an option', multiple = false, activeClass = 'bg-primary/10 text-primary', selectedClass, menuClass = 'max-h-60', ...props } = defineProps<Props<any>>()
const emits = defineEmits(['update:modelValue'])
//const multiple = Array.isArray(props.modelValue)

const modelValue = computed<any>({
  get() {
    // special logic because if modelValue isn't an instance from the options it selected object will not work.
    const item: any = props.modelValue
    if (multiple) {
      return item.length == 0
        ? item
        : typeof item[0] !== 'object'
          ? item // if primitive we can just return item
          : props.options?.filter((o) => item.some((y: any) => isEqual(y, getValue(o))))
    }
    return props.options?.find((o) => isEqual(getValue(o), item))
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const getValue = (item: any) => (props.valueField ? item[props.valueField] : item)
const getLabel = (item: any) => (props.labelField ? item[props.labelField] : item)
const isSeparator = (item: any) => 'Separator' in item && item['Separator'] === true

const currentValue = computed(() => {
  if (modelValue === undefined || modelValue === null) return undefined

  const item = modelValue

  if (multiple) {
    return item.value.length == 0 ? label : props.options?.filter((o) => item.value.some((y: any) => isEqual(y, getValue(o))))
  }

  return props.options?.find((o) => {
    return isEqual(getValue(o), getValue(item))
  })
})
const displayValue = computed(() => {
  const item = modelValue

  if (!item) return label

  if (multiple) {
    return item.value.length == 0 ? label : currentValue.value.map((x: any) => getLabel(x)).join(Separator)
  }

  const temp = currentValue

  return temp && getLabel(temp) ? getLabel(temp) : label
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<template>
  <Listbox v-model="modelValue" :multiple="multiple">
    <div class="relative">
      <slot name="button" :currentValue="currentValue">
        <ListboxButton :class="twMerge(
          'relative h-full w-full cursor-default rounded-sm border border-control bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm',
          $attrs.class as any
        )
          ">
          <span class="block truncate">
            <slot name="display" :text="currentValue">
              <i :class="[currentValue.icon, 'fa-light w-6 text-center']" v-if="currentValue && currentValue.icon"></i>
              {{ displayValue }}
            </slot>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <i class="far fa-chevron-down h-5 w-5 text-zinc-500" aria-hidden="true" />
          </span>
        </ListboxButton>
      </slot>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          :class="twMerge('absolute z-50 mt-1 w-full min-w-fit overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none', menuClass)">
          <ListboxOption v-slot="{ active, selected }" v-for="item in options" :key="getValue(item)"
            :value="getValue(item)" as="div">
            <slot :item="item" :active="active" :selected="selected">
              <template v-if="isSeparator(item)">
                <div>
                  <hr />
                </div>
              </template>
              <template v-else>
                <li
                  :class="[active ? activeClass : selected ? selectedClass : 'text-zinc-700', 'relative cursor-pointer select-none py-2', multiple === true ? 'pl-10 pr-4' : 'px-4']">
                  <slot name="item" :item="item" :active="active" :selected="selected">
                    <span :class="[selected ? 'font-medium text-primary' : 'font-normal', 'block truncate']">
                      <i :class="[item.icon, 'fa-light w-6 text-center']" v-if="item.icon"></i>
                      {{ getLabel(item) }}
                    </span>
                    <span v-if="selected && multiple"
                      class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                      <i class="far fa-check h-5 w-5" aria-hidden="true" />
                    </span>
                  </slot>
                </li>
              </template>
            </slot>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>