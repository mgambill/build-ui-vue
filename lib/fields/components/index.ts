import type { Field, Option, StringDictionary } from "./types"

export type FieldProps<P = StringDictionary<any>, A = StringDictionary<string>> = {
  field: Partial<Field<P,A>>
  index: number
  depth: number
  parent?: Partial<Field>
  fields?: Partial<Field>[]
  datasource?: Record<string, any>
}

export type Address = { lineOne: string, lineTwo?: string, city: string, region: string, postalCode: string }

export type { Field, Option }