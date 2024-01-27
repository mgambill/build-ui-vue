
import type { Ref } from 'vue'
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

// type EditorState = {
//   isEditor: Ref<boolean>,
//   removeOption(field: Partial<Field>, option: Option): void,
//   addOption(field: Partial<Field>, option: Option | string): void
//   updateField(field: Partial<Field>, fields: Ref<Partial<Field>[]>): void,
//   datasource: Ref<PathwayTemplate>
// }

//export const useEditor = (isEditor: MaybeRef<boolean>, datasource: MaybeRef<PathwayTemplate>): EditorState => {
export const useEditorStore = defineStore('editor', () => {
  const isEditor = ref<boolean>()
  const datasource = ref<PathwayTemplate>()
  const updateField = (field: Field, fields: Ref<Partial<Field>[]>) => {
    const index = toValue(fields).findIndex(f => f.id === field.id)
    toValue(fields).splice(index, 1, field)
  }
  const removeOption = (field: Partial<Field>, option: Option | string) => {
    const id = typeof option === 'string' ? option : option.id
    const index = toValue(field).options?.findIndex(o => o.id === id)
    toValue(field).options?.splice(index, 1)
  }

  const addOption = (field: Partial<Field>, option: Option | string) => {
    const temp = typeof option === 'string' ? { value: option, label: option, id: crypto.randomUUID(), icon: null } as Option : option
    toValue(field).options?.push(temp)
  }

  return { isEditor, datasource, updateField, removeOption, addOption }
})
