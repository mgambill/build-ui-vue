<script setup lang="ts">
import { useEditorState } from '@/components/EditorProvider'
import LabelField from './LabelField.vue'
import Wrapper from './Wrapper.vue'
import type { FieldProps } from '.';
import FieldResolver from './FieldResolver.vue';
import { useFormState, useProvideFormState, resolveProperty, type DataSet } from './useFormState'

const props = defineProps<FieldProps>()
const { isEditor = false } = useEditorState()

const count = ref(0)
const { useValue, datasource } = useFormState()
const local = useValue<any[]>(props, [])
const key = resolveProperty(props.field)
datasource.value[key] = []
const onAdd = () => {
  let obj: any = {}
  if (props.field.fields) {
    for (const f of props.field.fields) {
      const key = f.property ?? f.id!
      obj[key] = f.defaultValue ?? null
    }
    local.value.push(obj)
  }
  count.value = count.value + 1
}
const onRemove = () => {
  count.value = count.value - 1
  local.value.splice(count.value, 1)
}
</script>

<template>
  <Wrapper v-bind="props">
    <LabelField v-bind="props" />
    <template v-if="count === 0">
      <div class="bg-gray-100 p-2 italic">
        <p>No Items have been added</p>
      </div>
    </template>
    <template v-else>
      <div class="grid grid-cols-[1fr,auto] gap-x-1 mt-2">
        <div class="flex *:flex-1 gap-2 [&>*>[data-field=label]]:hidden">
          <template v-for="f in field.fields" :key="f.id">
            <LabelField v-bind="props" :field="f" />
          </template>
        </div>
        <div></div>
        <template v-for="(_, i) in count" :key="i">

          <div class="flex *:flex-1 gap-2 [&>*>[data-field=label]]:hidden mb-2">
            <template v-for="f in field.fields" :key="f.id">
              <FieldResolver :field="f" :parent="field" :index="i" :depth="depth + 1" />
            </template>
          </div>
          <button type="button" class="flex items-center px-3 hover:bg-zinc-100 rounded mb-2 border-transparent"
            @click="onRemove">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-4">
              <path
                d="M345 137l17-17L328 86.1l-17 17-119 119L73 103l-17-17L22.1 120l17 17 119 119L39 375l-17 17L56 425.9l17-17 119-119L311 409l17 17L361.9 392l-17-17-119-119L345 137z" />
            </svg>
          </button>

        </template>
      </div>
    </template>

    <button type="button" class=" px-5 py-2 bg-zinc-50 hover:bg-zinc-100 rounded mt-2" @click="onAdd">Add</button>

    <template v-if="isEditor">
      <p v-if="isEditor" class="italic text-gray-400 p-1">No Fields have been added to this row</p>
    </template>
  </Wrapper>
</template>