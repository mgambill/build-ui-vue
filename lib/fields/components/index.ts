import type { Field, Option } from "./types"

export type FieldProps = {
  field: Partial<Field>
  index: number
  depth: number
  parent?: Partial<Field>
  fields?: Partial<Field>[]
  datasource?: Record<string, any>
}

export type Address = { lineOne: string, lineTwo?: string, city: string, region: string, postalCode: string }

export type { Field, Option }