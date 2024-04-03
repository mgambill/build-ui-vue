import type { Component, Ref } from 'vue'
import { defineComponent } from 'vue'
type DefineComponent = ReturnType<typeof defineComponent>
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type RelationshipId = string

export type StringDictionary<T = any> = {
  [K in string]: T
}

export type Props<T = unknown> = {
  field: Field & T
  datasource: Ref<StringDictionary<any>>
  index: number
  depth: number
  parentIndex?: number
}

export type ControlDefinition = {
  id: number
  name: string
  fieldKey: string
  fieldName: string
  isList: boolean
  isQuestion: boolean
  isComposite: boolean
  isContainer: boolean
  isResizable: boolean
  isActive: boolean
  hasContent: boolean
  hasLabel: boolean
  icon: string
  category: string
  properties?: Record<string, Property>
  type?: string
  classification: ClassificationDefinitionType
  component: Component | DefineComponent | (() => Promise<Component | DefineComponent>)
}

export type Property = {
  label?: string
  placeholder?: string
  nullable?: boolean
  defaultValue: any
} & (
    | {
      type: 'boolean'
      defaultValue?: boolean
    }
    | {
      type: 'string'
      defaultValue?: string
    }
    | {
      type: 'number'
      defaultValue?: number
    }
    | {
      type: 'array'
      options: (string | Property)[]
    }
  )

export type ClassificationDefinitionType = 'advanced' | 'lists' | 'panels' | 'inputs' | 'literals'

export type ClassificationDefinition = {
  label: string
  key: ClassificationDefinitionType
  fillColor: string
  textColor: string
}

export type Option = {
  value: string | number | null | boolean
  label?: string
  icon?: string
} | {
  group: string,
  options: Omit<Option, 'group' | 'options'>[]
}
export type FieldCollection = Partial<Field>[]

export type LabelVisibilityType = 'visible' | 'hidden' | 'invisible'

export type Field = {
  id: string | number
  label?: {
    text: string
    visibility?: LabelVisibilityType
  }
  property?: string
  controlId: number
  props: StringDictionary<any>
  attrs: StringDictionary<string>
  fields?: FieldCollection
  options?: Option[]
  content: string
  defaultValue: any
  // content?: {
  //   type: 'html' | 'markdown' | 'text' | 'json'
  //   value: string
  // } | string
  $meta: any
}

export type RelationId = string
export type DateLike = string

export type Entity<T> = T & {
  id: RelationId
  collectionId: string
  collectionName: string
  created: DateLike
  updated: DateLike
}

export type SlotRecord = Record<string, { label: string; fields: FieldCollection }>

export type Form = Entity<{
  name: string
  title: string
  application: RelationId
  description?: string
  template: 'tabs' | 'simple' | 'wizard'
  slots: SlotRecord
  $meta?: any
}>

export type Page = Form & {
  active: boolean
  slug: string
  layout: RelationId
  status: RelationId
}

export type Application = {
  id: RelationId
  name: string
  tenant: RelationshipId
  description: string
  active: boolean
  url: string
  color: string
}