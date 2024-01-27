
import type { InjectionKey, MaybeRef, Ref } from 'vue'
import type { Field, Option } from './fields/types'

export type PathwayTemplate = {
  id: string,
  title: string
  definition: string
  steps: PathwayStep[]
}

export type PathwayStep = {
  id: string,
  title: string
  fields: Partial<Field>[]
  pathways: string[]
}

type EditorState = {
  isEditor: MaybeRef<boolean>
  datasource: MaybeRef<PathwayTemplate>
  removeOption(field: Partial<Field>, option: Option): void
  addOption(field: Partial<Field>, option: Option | string): void
  updateField(field: Partial<Field>, fields: Ref<Partial<Field>[]>): void
}

export const useEditor = (isEditor: MaybeRef<boolean>, datasource: MaybeRef<PathwayTemplate>): EditorState => {
  const updateField = (field: Field, fields: Ref<Partial<Field>[]>) => {
    const index = toValue(fields).findIndex(f => f.id === field.id)
    toValue(fields).splice(index, 1, field)
  }
  const removeOption = (field: Partial<Field>, option: Option | string) => {
    const id = typeof option === 'string' ? option : option.id
    const index = toValue(field).options?.findIndex(o => o.id === id)
    index !== undefined && toValue(field).options?.splice(index, 1)
  }
  const addOption = (field: Partial<Field>, option: Option | string) => {
    const temp: Option = typeof option === 'string' ? { value: crypto.randomUUID(), label: '' + option } satisfies Option : option
    toValue(field).options?.push(temp)
  }

  return { isEditor, datasource, updateField, removeOption, addOption }
}

export const EditorInjectionKey = Symbol() as InjectionKey<EditorState>

export const useEditorState = () => inject(EditorInjectionKey)!

