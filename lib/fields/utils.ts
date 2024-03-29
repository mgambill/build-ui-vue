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
}
export type CreateOptionWithChoices = CreateOption & {
  options: Option[]
}

export const createOptions = (...options: (string | Option)[]): Option[] => {
  const resolve = (opt: string | Option) => typeof opt === 'string' ? { label: opt, value: opt } : opt
  return options.map(resolve)
}

//

export const createHeader = (label: LabelOption) => createField('heading', 1152, { label })

export const createLabel = (label: LabelOption) => createField('label', 1107, { label })

export const createTime = (options: CreateOption & { placeholder?: string }) => createField('time', 1140, options)

export const createNumeric = (options: CreateOption<number> & { placeholder?: string, step?: number, min?: number, max?: number }) => {
  const { placeholder, step, min, max, ...o } = options
  return createField('numeric', 1157, o, { attrs: { placeholder, step, min, max } })
}

export const createText = (option: InputTextOption) => createInputField('text', 1106, option)

export const createPassword = (option: InputTextOption) => createInputField('password', 1161, option)

export const createParagraph = (option: InputTextOption) => createInputField('paragraph', 1124, option)

export const createDateTime = (option: InputTextOption) => createInputField('datetime', 1160, option)

export const createDate = (option: InputTextOption) => createInputField('date', 1126, option)

const createInputField =(control: Field['control'], controlId: number, option: InputTextOption, overrides?: any): Field => {
  const { placeholder, ...o } = option
  return createField(control, controlId, o, { attrs: { placeholder } })
}


export const createAddress = (option: CreateOption<Address>) => createField<Address>('address', 1169, option)

export const createYesNo = (option: CreateOption<boolean>) => createField('yesno', 1101, option)

export const createConsent = (option: CreateOption<boolean> & { content: string }) => createField('consent', 1165, option)

export const createDivider = (option?: CreateOption<never>) => createField('divider', 1162, option)



export const createDropdown = (options: CreateOptionWithChoices) => createField('row', 1103, options)

export const createRadioList = (options: CreateOptionWithChoices & { direction?: 'vertical' | 'horizontal' }) => {
  const { direction, ...rest } = options
  return createField('radiolist', 1104, rest, { props: { direction: direction ?? 'horizontal' } })
}

export const createCheckboxList = (options: CreateOptionWithChoices & { direction?: 'vertical' | 'horizontal' }) => {
  const { direction, ...rest } = options
  return createField('checkboxlist', 1105, rest, { props: { direction: direction ?? 'horizontal' } })
}

const createField = <T = string>(control: Field['control'], controlId: number, option?: CreateOption<T> | CreateOptionWithChoices, overrides?: any): Field => {
  const { label = null, ...rest } = option ?? {}
  const _label = option?.label ? (typeof label === 'string' ? { text: label } : label) : null

  const id = option?.id ?? crypto.randomUUID()
  return { id, controlId, control, label: _label, ...rest, ...overrides } as Field
}

//
export const createRepeater = (option: CreateOption & { fields: Field[] }) => {
  const controlId = 1167
  const control = 'repeater'
  const id = option.id ?? crypto.randomUUID()
  const { fields, label, ...rest } = option
  const _label = typeof label === 'string' ? { text: label } : label
  return { id, controlId, control, ...rest, fields, label: _label } as Field
}
export const createRow = (...fields: Field[]) => createContainerField('row', 1168, undefined, fields)

export const createPanel = (label?: LabelOption, ...fields: Field[]) => createContainerField('panel', 1166, label, fields)

export const createContainer = (...fields: Field[]) => createContainerField('panel', 2000, undefined, fields)

const createContainerField = (control: Field['control'], controlId: number, label?: LabelOption | undefined, fields?: Field[], overrides?: any): Field => {
  const id = crypto.randomUUID()
  const _label = typeof label === 'string' ? { text: label } : label
  return { id, controlId, control, fields, label: _label, ...overrides } as Field
}

//

export const createPage = (option: FormSchemaOption & Partial<Form>) => ({
  ...option,
  slots: { default: { label: 'default', fields: option.fields as Field[] } }
}) as Form;
