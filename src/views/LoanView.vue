<script setup lang="ts">
import { useProvideFormState } from '../components/fields/useFormState'

import * as _ from '~/fields'

import FieldCollectionResolver from '../components/fields/FieldCollectionResolver.vue'
import { useToggle } from '@vueuse/core';

const schema = _.createPage({
  title: 'Custom Form',
  fields: [
    _.createPanel(
      "Markup",
      _.createRow(
        _.createLabel("Label Field"),
        _.createLabel("Heading Field")
      ),
      _.createRow(
        _.createLabel("My Label"),
        _.createHeader("A Heading")
      )
    ),
    _.createPanel(
      "Simple Fields",
      _.createHeader("Text Fields"),
      _.createRow(
        _.createText({
          label: 'Text Field',
          property: 'text-field',
          defaultValue: 'default text'
        }),
        _.createPassword({
          label: 'Password Field',
          property: 'password-field',
          defaultValue: 'default password'
        }),
        _.createNumeric({
          label: 'Numeric Field',
          property: 'numeric-field',
          defaultValue: 10
        })
      ),
      _.createParagraph({
        label: "Paragraph Field",
        property: 'paragraph-field',
        defaultValue: 'default paragraph'
      }),
      _.createDivider(),
      _.createHeader("Date & Time Fields"),
      _.createRow(
        _.createDate({
          label: 'Date Field',
          property: 'date-field',
          defaultValue: '@now()'
        }),
        _.createDateTime({
          label: 'Date/Time Field',
          property: 'datetime-field',
          defaultValue: '@now()'
        }),
        _.createTime({
          label: 'Time Field',
          property: 'time-field',
          defaultValue: '@now()'
        })
      ),
      _.createDivider(),
      _.createHeader("Boolean Fields"),
      _.createRow(
        _.createYesNo({
          label: 'Yes No Field',
          property: 'yesno-field',
          defaultValue: true
        }),
        _.createConsent({
          label: 'Consent Field',
          property: 'consent-field',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          defaultValue: true
        }),
      )
    ),
    _.createPanel(
      "List Fields",
      _.createRow(
        _.createDropdown({
          label: 'Data Room Name',
          options: _.createOptions('Apple', 'Banana', 'Cherry'),
          property: 'radio-field'
        })
      ),
      _.createRow(
        _.createRadioList({
          label: 'Radio List Field',
          options: _.createOptions('Apple', 'Banana', 'Cherry'),
          property: 'radio-field'
        }),
        _.createCheckboxList({
          label: 'Checkbox List Field',
          options: _.createOptions('Apple', 'Banana', 'Cherry'),
          property: 'checkbox-field',
          direction: 'horizontal'
        })
      )
    ),
    _.createPanel(
      "Compound Fields",
      _.createAddress({
        label: 'Address Field',
        property: 'address-field',
        defaultValue: ({ lineOne: 'lineOne', lineTwo: 'lineTwo?', city: 'city', region: 'state', postalCode: 'zipcode' })
      })
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
