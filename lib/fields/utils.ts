import type { Form } from '@/components/fields/types';
import type { Address } from '@/components/fields';
import type { Field, Option } from './types'

export type FormSchemaOption = {
  fields: Field[];
};
export type LabelOption = Field['label'] | string

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

export const createTime = (options: CreateOption) => createField('time', 1140, options)

export const createNumeric = (options: CreateOption<number>) => createField('numeric', 1157, options)

export const createText = (options: CreateOption) => createField('text', 1106, options)

export const createPassword = (options: CreateOption) => createField('password', 1161, options)

export const createParagraph = (options: CreateOption) => createField('paragraph', 1124, options)

export const createDateTime = (options: CreateOption) => createField('datetime', 1160, options)

export const createDate = (options: CreateOption) => createField('date', 1126, options)



export const createAddress = (options: CreateOption<Address>) => createField<Address>('address', 1169, options)

export const createYesNo = (options: CreateOption<boolean>) => createField('yesno', 1101, options)

export const createConsent = (options: CreateOption<boolean> & { content: string }) => createField('consent', 1165, options)

export const createDivider = (options?: CreateOption<never>) => createField('divider', 1162, options)



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
