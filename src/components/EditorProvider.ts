
import type { InjectionKey, MaybeRef, Ref } from 'vue'
import type { Field, Option } from './fields/types'
import { createInjectionState } from '@vueuse/core'

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
/*
type EditorState = {
  isEditor: MaybeRef<boolean>
  datasource: MaybeRef<PathwayTemplate>
  currentField: MaybeRef<MaybeRef<Partial<Field>> | Partial<Field> | undefined>
  selectField(field: MaybeRef<Partial<Field>>): void
  removeOption(field: Partial<Field>, option: Option): void
  addOption(field: Partial<Field>, option: Option | string): void
  updateField(field: Partial<Field>, fields: Ref<Partial<Field>[]>): void
}

export const useEditor = (isEditor: MaybeRef<boolean>, datasource: MaybeRef<PathwayTemplate>): EditorState => {
  const currentField = ref<MaybeRef<Partial<Field>> | Partial<Field> | undefined>()
  const updateField = (field: Field, fields: Ref<Partial<Field>[]>) => {
    const index = toValue(fields).findIndex(f => f.id === field.id)
    toValue(fields).splice(index, 1, field)
  }
  const removeOption = (field: Partial<Field>, option: Option | string) => {
    const id = typeof option === 'string' ? option : option.value
    const index = toValue(field).options?.findIndex(o => o.value === id)
    index !== undefined && toValue(field).options?.splice(index, 1)
  }
  const addOption = (field: Partial<Field>, option: Option | string) => {
    const temp: Option = typeof option === 'string' ? { value: crypto.randomUUID(), label: '' + option } satisfies Option : option
    toValue(field).options?.push(temp)
  }

  const selectField = (field: MaybeRef<Partial<Field>>) => {
    currentField.value = field
  }

  return { isEditor, datasource, currentField, selectField, updateField, removeOption, addOption }
}
*/
const [useProvideEditorState, _useEditorState] = createInjectionState((isEditor: MaybeRef<boolean>, datasource: MaybeRef<PathwayTemplate>) => {
  const currentField = ref<MaybeRef<Partial<Field>> | Partial<Field> | undefined>()
  const updateField = (field: Field, fields: MaybeRef<Partial<Field>[]>) => {
    const index = toValue(fields).findIndex(f => f.id === field.id)
    toValue(fields).splice(index, 1, field)
  }
  const removeOption = (field: Partial<Field>, option: Option | string) => {
    const id = typeof option === 'string' ? option : option.value
    const index = toValue(field).options?.findIndex(o => o.value === id)
    index !== undefined && toValue(field).options?.splice(index, 1)
  }
  const addOption = (field: Partial<Field>, option: Option | string) => {
    const temp: Option = typeof option === 'string' ? { value: crypto.randomUUID(), label: '' + option } satisfies Option : option
    toValue(field).options?.push(temp)
  }

  const selectField = (field: MaybeRef<Partial<Field>>) => {
    currentField.value = field
  }

  return { isEditor, datasource, currentField, selectField, updateField, removeOption, addOption }
})

export { useProvideEditorState }

const noop = () => { }

export function useEditorState() {
  
    const store = _useEditorState()
    if (store === undefined)
      return { isEditor: false, datasource: {}, currentField: null, selectField: noop, updateField: noop, removeOption: noop, addOption: noop }

    return store

}

