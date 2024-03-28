<script setup lang="ts">
import { useProvideFormState } from '../components/fields/useFormState'

import {
  createAddress,
  createCheckboxList,
  createConsent,
  createDivider,
  createDateTime,
  createDate,
  createDropdown,
  createHeader,
  createNumeric,
  createPassword,
  createParagraph,
  createRow,
  createRadioList,
  createPage,
  createOptions,
  createPanel,
  createLabel,
  createText,
  createTime,
  createYesNo,
} from '~/fields'

import FieldCollectionResolver from '../components/fields/FieldCollectionResolver.vue'
import { useToggle } from '@vueuse/core';

const schema = createPage({
  title: 'Custom Form',
  fields: [
    createPanel(
      "Markup",
      createRow(
        createLabel("Label Field"),
        createLabel("Heading Field")
      ),
      createRow(
        createLabel("My Label"),
        createHeader("A Heading")
      )
    ),
    createPanel(
      "Simple Fields",
      createHeader("Text Fields"),
      createRow(
        createText({
          label: 'Text Field',
          property: 'text-field',
          defaultValue: 'default text'
        }),
        createPassword({
          label: 'Password Field',
          property: 'password-field',
          defaultValue: 'default password'
        }),
        createNumeric({
          label: 'Numeric Field',
          property: 'numeric-field',
          defaultValue: 10
        })
      ),
      createParagraph({
        label: "Paragraph Field",
        property: 'paragraph-field',
        defaultValue: 'default paragraph'
      }),
      createDivider(),
      createHeader("Date & Time Fields"),
      createRow(
        createDate({
          label: 'Date Field',
          property: 'date-field',
          defaultValue: '@now()'
        }),
        createDateTime({
          label: 'Date/Time Field',
          property: 'datetime-field',
          defaultValue: '@now()'
        }),
        createTime({
          label: 'Time Field',
          property: 'time-field',
          defaultValue: '@now()'
        })
      ),
      createDivider(),
      createHeader("Boolean Fields"),
      createRow(
        createYesNo({
          label: 'Yes No Field',
          property: 'yesno-field',
          defaultValue: true
        }),
        createConsent({
          label: 'Consent Field',
          property: 'consent-field',
          content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          defaultValue: true
        }),
      )
    ),
    createPanel(
      "List Fields",
      createRow(
        createDropdown({
          label: 'Data Room Name',
          options: createOptions('Apple', 'Banana', 'Cherry'),
          property: 'radio-field'
        })
      ),
      createRow(
        createRadioList({
          label: 'Radio List Field',
          options: createOptions('Apple', 'Banana', 'Cherry'),
          property: 'radio-field'
        }),
        createCheckboxList({
          label: 'Checkbox List Field',
          options: createOptions('Apple', 'Banana', 'Cherry'),
          property: 'checkbox-field',
          direction: 'horizontal'
        })
      )
    ),
    createPanel(
      "Compound Fields",
      createAddress({
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
