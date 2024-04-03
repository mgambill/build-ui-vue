import type { Field } from "./Field"

export type FormSlot = Record<string, { field: Field[] }>

export type Form = {
  title: string
  slots: FormSlot
}