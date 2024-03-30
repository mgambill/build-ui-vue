<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import { useProvideFormState } from '../components/fields/useFormState'

import * as field from '~/fields'
import { createOptions, type Form, type Field, type FieldCollection } from '~/fields'
import { ConditionRunner, conditionRunnerDefinitions, condition, type ConditionType, type Condition } from '~/ruleEngine'
import FieldCollectionResolver from '../components/fields/FieldCollectionResolver.vue'

const schema: Form = field.page({
  title: 'Custom Form',
  fields: [
    field.panel({
      label: 'Basic Info',
      fields: [
        field.dropdown({
          label: 'Loan Currency',
          options: createOptions('USD', 'GBD'),
          validation: ['required'],
          property: 'currency'
        }),
        field.checkboxList({
          label: `What is the loan's purpose?`,
          options: createOptions('Aquisition', 'Refinancing', 'Construction'),
          allowOther: true,
          other: field.paragraph({
            label: `Description (If 'other' is selected)`,
            property: 'OtherPurposeTypeDescription',
            validation: {
              required: {
                when: {
                  property: 'Purposes',
                  operator: 'Contains',
                  value: 'Other'
                }
              }
            }
          }),
          validation: ['required'],
          property: 'Purposes'
        }),
        field.yesNo({
          label: 'Secured or unsecured?',
          yesText: 'Secured',
          noText: 'Unsecured',
          //allowEmpty: true,
          validation: ['required'],
          property: 'IsSecured'
        }),
        field.text({
          label: 'Total loan commitment:',
          prefix: 'USD',
          hint: '',
          validation: ['required'],
          property: 'TotalLoanAmount'
        }),
        field.yesNo({
          label: 'CMBS loan?',
          validation: ['required'],
          property: 'IsCMBS'
        }),
        field.yesNo({
          label: 'Single Borrower Deal?',
          validation: ['required'],
          property: 'IsSingle'
        }),
        field.text({
          label: 'CMBS Deal Ticker',
          property: 'CMBSTicker'
        })
      ]
    })
  ]
})

function parseSchema(schema: Partial<{ fields: Field[] | FieldCollection }>): Record<Field['control'], string> {
  let typeMap: Record<string, string> = {}

  function exploreFields(fields: Field[]) {
    fields.forEach((field) => {
      if (field.property && field.control) {
        // Assume the type matches the function name, e.g., field.YesNo -> YesNo
        typeMap[field.property] = field.control
      }

      // Recursively explore fields if present
      if (field.fields) {
        exploreFields(field.fields)
      }
    })
  }
  schema.fields && exploreFields(schema.fields)
  return typeMap
}

type Model = {
  Currency: number
  TotalLoanAmount: number
  IsCMBS: boolean
  IsSecured: boolean
  OtherPurposeTypeDescription: string
  Purposes: string[]
  CMBSTicker: string
  IsSingle: boolean
}

function validation<T, W = never>(option: ConditionType<T, W> & { message: string; errorCode: string; ruleSet: string }) {
  const { message, errorCode, ruleSet } = option
  return { ...condition(option), message, errorCode, ruleSet } as Condition & { message: string; errorCode: string; ruleSet: string }
}

const def = parseSchema(schema.slots['default'])

const rules = [
  validation<Model>({
    property: 'IsCMBS',
    operator: 'NotNull',
    message: 'Must have value',
    errorCode: '105',
    ruleSet: 'basic'
  }),
  validation<Model>({
    property: 'IsSecured',
    operator: 'NotNull',
    message: 'Loan must be Secured or Unsecured.',
    errorCode: '106',
    ruleSet: 'basic'
  }),
  validation<Model, Model>({
    property: 'OtherPurposeTypeDescription',
    operator: 'IsDefined',
    message: "Description must be included if 'Other' is selected (at least one character)",
    errorCode: '107',
    ruleSet: 'basic',
    when: condition<Model>({
      property: 'Purposes',
      operator: 'Contains',
      value: 'Other'
    })
  }),
  validation<Model>({
    property: 'Purposes',
    operator: 'IsDefined',
    message: 'Must have data present from selection options (Acquisition, Refinancing, Construction, Other)',
    errorCode: '108',
    ruleSet: 'basic'
  })
]

const { datasource } = useProvideFormState(schema)
const [open, toggle] = useToggle(false)
const results = ref<any>([])

const cr = new ConditionRunner(conditionRunnerDefinitions)

const errors = computed(() => {
  return results.value.filter((x: any) => x.result === false).map((x: any) => ({ property: x.condition.property, message: x.condition.message, code: x.condition.errorCode }))
})
watchEffect(() => {
  try {
    results.value = cr.evaluate(toValue(datasource), ...rules) // re.evaluate(datasource, rules)
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>

  <div class="text-slate-300" >
    <div class="grid grid-cols-5 h-screen">
      <div class="bg-slate-950 p-2 col-span-2 flex overflow-y-auto" v-if="open">
        <pre>{{ schema }}</pre>
      </div>
      <div class="p-4 bg-zinc-100 text-zinc-600 flex flex-col overflow-y-auto" :class="open ? 'col-span-3' : 'col-span-full'">
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
        <pre class="bg-yellow-50 p-3 mt-6">{{ { datasource, errors } }}</pre>
      </div>
    </div>
  </div>
</template>
