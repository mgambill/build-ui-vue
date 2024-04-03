<script setup lang="ts">
import type { MaybeRef } from 'vue'
import { useProvideFormState, type DataSet } from '~/fields/components/useFormState'
import type { Form, Option } from '~/fields/types';
import * as field from '~/fields'
import { createOptions } from '~/fields'

import FieldCollectionResolver from '~/fields/components/FieldCollectionResolver.vue'
import { useToggle } from '@vueuse/core';


const schema = field.page({
  title: 'Custom Form',
  fields: [
    field.panel({
      label: 'Basic Info',
      fields: [
        field.dropdown({
          label: 'Loan Currency',
          options: createOptions('USD', 'GBD'),
          validation: ['required'],
          property: "currency"
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
                  "property": "Purposes",
                  "token": "Contains",
                  "value": "Other"
                }
              }
            }
          }),
          validation: ['required'],
          property: 'Purposes'
        }),
        field.radioList({
          label: 'Secured or unsecured?',
          options: createOptions('Secured', 'Unsecured'),
          validation: ['required'],
          property: 'IsSecured'
        }),
        field.text({
          label: 'Total loan commitment:',
          prefix: 'USD',
          hint: '',
          validation: ['required'],
          property: "TotalLoanAmount"
        }),
        field.yesNo({
          label: 'CMBS loan?',
          validation: ['required'],
          property: 'IsCMBS'
        }),
        field.yesNo({
          label: 'Single Borrower Deal?',
          validation: ['required'],
          property: "IsSingle"
        }),
        field.text({
          label: 'CMBS Deal Ticker',
          property: "CMBSTicker"
        })
      ]
    }),
  ]
})

const createRules = (obj: Partial<Form>, options: ConditionDefinition<any>[]) => options
const createRule = <T extends object>(o: ConditionDefinition<T> | ConditionDefinition<never, never, T>['when']) => o

type Model = {
  "IsCMBS": boolean
  "IsSecured": boolean
  "OtherPurposeTypeDescription": string
  "Purposes": string
}

type ConditionDefinition<T extends object, K = keyof T, W extends object = any> = {
  property?: K
  token: "NotNull" | "NotEmpty" | "Contains" | "LookupToken" | "Set" | "LookupToken"
  value?: any
  message: string
  errorCode: string
  ruleSet: string
} & ({
  token: 'Set'
  rules: ConditionDefinition<T, K, W>[]
} | {
  when?: Pick<ConditionDefinition<W>, 'property' | 'token' | 'value'>
})

const rules = createRules(schema, [
  createRule<Model>({
    "property": 'IsCMBS',
    "token": "NotNull",
    "message": "Must have value",
    "errorCode": "105",
    "ruleSet": "basic"
  }),
  createRule<Model>({
    "property": "IsSecured",
    "token": "NotNull",
    "message": "Loan must be Secured or Unsecured.",
    "errorCode": "106",
    "ruleSet": "basic"
  }),
  createRule<Model>({
    "property": "OtherPurposeTypeDescription",
    "token": "NotEmpty",
    "message": "Description must be included if 'Other' is selected (at least one character)",
    "errorCode": "107",
    "ruleSet": "basic",
    "when": createRule<Model>({
      "property": "Purposes",
      "token": "Contains",
      "value": "Other"
    })
  }),
  createRule<Model>({
    "property": "Purposes",
    "token": "Set",
    "message": "Must have data present from selection options (Acquisition, Refinancing, Construction, Other)",
    "errorCode": "108",
    "ruleSet": "basic",
    "rules": [
      createRule({
        "token": "LookupToken"
      }),
      createRule({
        "token": "NotEmpty"
      })
    ]
  })
])
type Predicate<T> = (x: T) => boolean

type EvaluatorOption = {
  value: any,
  source: DataSet
  rule: Partial<ConditionDefinition<any>>
}

class RuleEngine {
  evaluators: Record<string, Predicate<EvaluatorOption>> = {}

  register(name: string, evaluator: Predicate<EvaluatorOption>) {
    this.evaluators[name] = evaluator;
  }

  evaluate(source: MaybeRef<DataSet>, rules: ReturnType<typeof createRules>) {
    console.log("Evaluate", rules)
    var _source = toValue(source)
    var results = rules.map(r => this.internalEvaluate(_source, r))
    console.log('>', results)
    return results.filter(Boolean)

  }

  internalEvaluate(_source: DataSet, r: Partial<ConditionDefinition<any>>, isWhen: boolean = false) {
    if (r.token === undefined) return

    if (r.token === 'Set') {
      if ('rules' in r && Array.isArray(r.rules)) {
        console.log("SET", _source, r.token, r.message, r.rules.map(rx => this.internalEvaluate(_source, rx)))
        if (r.rules.every(rx => this.internalEvaluate(_source, rx))) return r;
        return
      }
    }

    let ev = this.evaluators[r.token]

    if (ev === undefined) {
      console.log(`token '${r.token}' not mapped.`)
      return
    }

    let value

    if (r.property && r.property in _source) {
      value = _source[r.property.toString()]
    }

    if ('when' in r && r.when) {
      console.log('when condition', r.when)

      let res = this.internalEvaluate(_source, r.when, true)
      if (res === undefined) {
        console.log('when condition not met', r.when, value)
        return
      }
    }

    const result = ev({ value, source: _source, rule: r })
    //console.log({ value, source: _source, rule: r.message, property: r.property, result, isWhen })
    return result ? r : undefined;
  }

}

const { datasource } = useProvideFormState(schema)
const [open, toggle] = useToggle(false)
const results = ref<any>([])
const re = new RuleEngine()

re.register('NotEmpty', ({ value, source, rule }) => {
  console.log('NotEmpty', { value, source, property: rule.property, rv: rule.value })
  return value !== undefined && value.toString().length > 0
})
re.register('NotNull', ({ value, source, rule }) => {
  console.log('NotNull', { value, source, property: rule.property, rv: rule.value, res: value !== undefined })
  return value !== undefined
})
re.register('Contains', ({ value, source, rule }) => {
  console.log('Contains', { value, source, property: rule.property, rv: rule.value })

  if (value === undefined) false
  if (Array.isArray(value)) {
    if (value.length === 0) return false
    if (typeof value[0] === 'object') {
      for (var i = 0; i < value.length; i++) {
        const opt: Option = value[i]
        if (Array.isArray(value)) {
          return value.includes(opt)
        }
        else if ('value' in opt && opt.value === value.toString())
          return true;
      }

    }
    return value.includes(rule.value)
  }
  if (typeof value === 'object') {
    if ('value' in value) return rule.value === value.value
  }
  return value === rule.value
})
re.register('LookupToken', ({ value, source, rule }) => {
  console.log('LookupToken', { value, source, property: rule.property, rv: rule.value, res: typeof value === 'object' })
  if (Array.isArray(value)) {
    if (value.length === 0) return false
    return (typeof value[0] === 'object')
  }
  return typeof value === 'object'
})
// re.register('Set', ({ value, source, rule }) => {

// })

watchEffect(() => {
  results.value = re.evaluate(datasource, rules)
})

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
        <pre class="bg-yellow-50 p-3 mt-6">{{ { datasource, results, rules } }}</pre>
      </div>
    </div>


  </div>
</template>
