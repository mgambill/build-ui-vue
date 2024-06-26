import type { Form } from '@/components/fields/types';
import type { Address } from '@/components/fields';
import type { Field, Option } from './types'

export type FormSchemaOption = {
  fields: Field[];
};
export type LabelOption = Field['label'] | string
export type InputTextOption = CreateOption<string> & { placeholder?: string }
export type CreateOption<T = string> = {
  id?: string
  label: LabelOption,
  property?: string
  defaultValue?: T
  validation?: ('required')[] | Record<'required', ValidationOptions>
}

type Condition<T = any, P = string> = {
  property: P,
  operator: 'Contains' | 'NotNull',
  value: T
}

type ValidationOptions<T = any> = {
  when?: Condition<T>
}
export type CreateOptionWithChoices = CreateOption & {
  options: Option[]
}

export const createOptions = (...options: (string | Option)[]): Option[] => {
  const resolve = (opt: string | Option) => typeof opt === 'string' ? { label: opt, value: opt } : opt
  return options.map(resolve)
}

//

export const header = (label: LabelOption) => createField('heading', 1152, { label })

export const label = (label: LabelOption) => createField('label', 1107, { label })


type CreateInputOption<T = string> = CreateOption<T> & { placeholder?: string, prefix?: string | { icon: string }, hint?: string }


export const numeric = (options: CreateInputOption<number> & { step?: number, min?: number, max?: number }) => {
  return createField('numeric', 1157, options, { attrs: ['placeholder', 'prefix', 'hint'], props: ['step', 'min', 'max'] })
}

export const time = (options: CreateInputOption) => createInputField('time', 1140, options)

export const text = (options: CreateInputOption) => createInputField('text', 1106, options)

export const password = (options: CreateInputOption) => createInputField('password', 1161, options)

export const paragraph = (options: CreateInputOption) => createInputField('paragraph', 1124, options)

export const dateTime = (options: CreateInputOption) => createInputField('datetime', 1160, options)

export const date = (options: CreateInputOption) => createInputField('date', 1126, options)

const createInputField = <T>(control: Field['control'], controlId: number, options: CreateInputOption<T>) => {
  return createField(control, controlId, options, { attrs: ['placeholder', 'prefix', 'hint'] })
}

export const address = (options: CreateOption<Address>) => createField('address', 1169, options)



export const yesNo = (options: CreateOption<boolean> & { yesText?: string, noText?: string, allowEmpty?: boolean, layout?: 'dropdown' | 'radio list' }) => createField('yesno', 1101, options, { props: ['layout','noText', 'yesText', 'allowEmpty'], defaults: { layout: 'radio list' } })

export const consent = (options: CreateOption<boolean> & { content: string }) => createField('consent', 1165, options)

export const divider = (options?: CreateOption<never>) => createField('divider', 1162, options)


export const dropdown = (options: CreateOptionWithChoices) => createField('dropdown', 1103, options)

export const radioList = (options: CreateOptionWithChoices & { direction?: 'vertical' | 'horizontal', allowOther?: boolean, other?: Omit<CreateOption, 'id'> }) => {
  return createField('radiolist', 1104, options, { props: ['direction', 'allowOther', 'other'], defaults: { direction: 'horizontal' } })
}

export const checkboxList = (options: CreateOptionWithChoices & { direction?: 'vertical' | 'horizontal', allowOther?: boolean, other?: Omit<CreateOption, 'id'> }) => {
  return createField('checkboxlist', 1105, options, { props: ['direction', 'allowOther', 'other'], defaults: { direction: 'horizontal' } })
}

const createField = <T, O extends CreateOption<T>>(control: Field['control'], controlId: number, option?: O, settings?: ExtractOptionsConfig): Field => {
  const { label = null, ...rest } = option ?? {}
  const _label = option?.label ? (typeof label === 'string' ? { text: label } : label) : null
  const opts = extractOptions(rest, settings)
  const id = option?.id ?? crypto.randomUUID()
  return { id, controlId, control, label: _label, ...opts } as Field
}

//
export const repeater = (option: CreateOption & { fields: Field[] }) => {
  const controlId = 1167
  const control = 'repeater'
  const id = option.id ?? crypto.randomUUID()
  const { fields, label, ...rest } = option
  const _label = typeof label === 'string' ? { text: label } : label
  return { id, controlId, control, ...rest, fields, label: _label } as Field
}
export const row = (...fields: Field[]) => createContainerField('row', 1168, undefined, fields)

export const panel = (options: { label?: LabelOption, fields: Field[] }) => {
  const { label, fields } = options
  return createContainerField('panel', 1166, label, fields)
}

export const container = (...fields: Field[]) => createContainerField('panel', 2000, undefined, fields)

const createContainerField = (control: Field['control'], controlId: number, label?: LabelOption | undefined, fields?: Field[], overrides?: any): Field => {
  const id = crypto.randomUUID()
  const _label = typeof label === 'string' ? { text: label } : label
  return { id, controlId, control, fields, label: _label, ...overrides } as Field
}

//

export const page = (option: FormSchemaOption & Partial<Form>) => ({
  ...option,
  slots: { default: { label: 'default', fields: option.fields as Field[] } }
}) as Form;

type ExtractOptionsConfig = {
  attrs?: string[],
  props?: string[],
  defaults?: Record<string, any>
}

function extractOptions<T, TOption extends Partial<CreateOption<T>>>(
  obj: TOption,
  config: ExtractOptionsConfig = {}
) {
  const { attrs: attrKeys = [], props: propKeys = [], defaults: defaultValues = {} } = config;

  // First Position: Remaining key/values
  const remaining: Record<string, any> = {};

  // Second Position: Key/values based on attrKeys
  const attrObj: Record<string, any> = {};

  // Third Position: Key/value based on propKeys
  const propObj: Record<string, any> = {};

  // Iterate through the keys of the input object
  for (const key of Object.keys(obj)) {

    if (attrKeys.includes(key)) {
      // If the key is in attrKeys, add it to attrObj
      attrObj[key] = obj[key] ?? defaultValues[key]
    } else if (propKeys.includes(key)) {
      // If the key is in propKeys, add it to propObj
      propObj[key] = obj[key] ?? defaultValues[key]
    } else {
      // If the key is not in attrKeys or propKeys, add it to remaining
      remaining[key] = obj[key] ?? defaultValues[key]
    }
  }

  return { ...remaining, attrs: { ...attrObj }, props: { ...propObj } };
}