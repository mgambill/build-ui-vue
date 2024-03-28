import type { InjectionKey, MaybeRef, Ref } from 'vue'

import { createInjectionState } from '@vueuse/core'

export type PanelProp = {
  title: MaybeRef<string>, icon: string, condition?: () => boolean
}

const [useProvidePanelState, _usePanelState] = createInjectionState((panels: Ref<PanelProp[]>) => {


  //const panels = ref<PanelProp[]>(intialPanels)

  const registerPanel = (option: PanelProp) => {
    panels.value.push(option)
  }

  return { registerPanel }

})

export { useProvidePanelState }

export function usePanelState() {
  const counterStore = _usePanelState()
  if (counterStore == null) throw new Error("Must call useProvidePanelState first.")
  return counterStore
}

