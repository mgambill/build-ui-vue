<script setup lang="ts">
import { useProvideFormState } from '../components/fields/useFormState'

import * as fields from '~/fields'
import { createOptions } from '~/fields'

import FieldCollectionResolver from '../components/fields/FieldCollectionResolver.vue'
import { useToggle } from '@vueuse/core';

const schema = fields.page({
  title: 'Custom Form',
  fields: [

    fields.panel({
      label: "Markup",
      fields: [fields.row(
        fields.label("Label Field"),
        fields.label("Heading Field")
      ),
      fields.row(
        fields.label("My Label"),
        fields.header("A Heading")
      )
      ]
    }),

    fields.panel({
      label: "Simple Fields",
      fields: [
        fields.header("Text Fields"),
        fields.row(
          fields.text({
            label: 'Text Field',
            property: 'text-field',
            defaultValue: 'default text'
          }),
          fields.password({
            label: 'Password Field',
            property: 'password-field',
            defaultValue: 'default password'
          }),
          fields.numeric({
            label: 'Numeric Field',
            property: 'numeric-field',
            defaultValue: 10
          })
        ),
        fields.paragraph({
          label: "Paragraph Field",
          property: 'paragraph-field',
          defaultValue: 'default paragraph'
        }),

        fields.divider(),
        fields.header("Date & Time Fields"),
        fields.row(
          fields.date({
            label: 'Date Field',
            property: 'date-field',
            defaultValue: '@now()'
          }),
          fields.dateTime({
            label: 'Date/Time Field',
            property: 'datetime-field',
            defaultValue: '@now()'
          }),
          fields.time({
            label: 'Time Field',
            property: 'time-field',
            defaultValue: '@now()'
          })

        ),

        fields.divider(),
        fields.header("Boolean Fields"),
        fields.row(
          fields.yesNo({
            label: 'Yes No Field',
            property: 'yesno-field',
            defaultValue: true
          }),
          fields.consent({
            label: 'Consent Field',
            property: 'consent-field',
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            defaultValue: true
          }),
        )
      ]
    }
    ),
    fields.panel({
      label: "List Fields",
      fields: [
        fields.row(
          fields.dropdown({
            label: 'Data Room Name',
            options: createOptions('Apple', 'Banana', 'Cherry'),
            property: 'dropdown-field'
          })
        ),
        fields.row(
          fields.radioList({
            label: 'Radio List Field',
            options: createOptions('Apple', 'Banana', 'Cherry'),
            property: 'radio-field'
          }),
          fields.checkboxList({
            label: 'Checkbox List Field',
            options: createOptions('Apple', 'Banana', 'Cherry'),
            property: 'checkbox-field',
            direction: 'horizontal'
          })
        )
      ]
    }),

    fields.panel({
      label: "Compound Fields",
      fields: [
        fields.address({
          label: 'Address Field',
          property: 'address-field',
          defaultValue: ({ lineOne: 'lineOne', lineTwo: 'lineTwo?', city: 'city', region: 'state', postalCode: 'zipcode' })
        }),
        fields.divider(),
        fields.repeater({

          label: 'Repeater Field',
          fields: [
            fields.text({
              label: 'Text Field',
              property: 'text-field'
            }),
            fields.numeric({
              label: 'Numeric Field',
              property: 'numeric-field',
              defaultValue: 2
            })
          ],
          property: 'repeater-field'
        })
      ]
    })
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
