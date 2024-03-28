<script setup lang="ts">
import { type MaybeRef } from 'vue'
import { TabPanel } from '@headlessui/vue'
import { type PanelProp, usePanelState } from './PanelGroupState'


const { title, icon = '', condition = () => true } = defineProps<PanelProp>()

const { registerPanel } = usePanelState()
registerPanel({ title, icon })
// const emits = defineEmits()
</script>

<template>
  <TabPanel>

    <div>
      <slot />
    </div>
  </TabPanel>
</template>
