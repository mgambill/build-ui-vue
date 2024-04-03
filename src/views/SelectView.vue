<script setup lang="ts">
import { useProvideFormState } from '../components/fields/useFormState'

import * as _ from '~/fields'

import FieldCollectionResolver from '../components/fields/FieldCollectionResolver.vue'
import { useToggle } from '@vueuse/core';

const schema = _.createPage({
  title: 'Custom Form',
  fields: [
    _.createPanel(
      'Form',
      _.createText({
        label: 'Title',
        property: 'title'
      }),
      _.createDropdown({
        label: 'Type',
        property: 'controlId',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ]
      }),
      _.createParagraph({
        label: 'Label',
        property: 'label'
      }),
    )
  ]
})

const { datasource } = useProvideFormState(schema)
const [open, toggle] = useToggle(false)

</script>

<template>
  <div class="text-slate-300">
    <div class="grid grid-cols-5 h-screen">
      <div class="bg-slate-950 p-2 col-span-2 flex overflow-y-auto" v-if="open">
        <pre>{{ schema }}</pre>
      </div>
      <div class="p-4 bg-zinc-100 text-zinc-600 flex flex-col overflow-y-auto "
        :class="open ? 'col-span-3' : 'col-span-full'">
        <div class="relative">
          <h1 class="text-4xl font-extralight mb-4">{{ schema.title }}</h1>
          <div class="absolute right-0 top-0">
            <button @click="() => toggle()">
              <template v-if="open">Close</template>
              <template v-else>Open</template>
            </button>
          </div>
          <form>
            <FieldCollectionResolver :field="schema" class="space-y-3" :depth="0" :index="-1" />
          </form>
        </div>
        <pre class="bg-yellow-50 p-3 mt-6">{{ { datasource: datasource } }}</pre>
      </div>
    </div>


  </div>
</template>
