import type { Field } from "./types"

export type FieldProps = {
  field: Partial<Field>
  index: number
  depth: number
  parent?: Field
  fields: Partial<Field>[]
}