import type { Ref, ComputedRef } from 'vue'

export type InlineEditState = {

  editMode: Ref<boolean>
  emptyText: string
  showCaret: boolean
  title: string
  modelValue: Ref<string|number|Date|undefined>
  modelValueDisplay: ComputedRef<string|number|Date|undefined>
}

export const inlineEditStateKey = Symbol() as InjectionKey<InlineEditState>
