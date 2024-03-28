<script setup lang="ts">

import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useProvidePanelState, type PanelProp } from './PanelGroupState'

const panels = ref<PanelProp[]>([]);
useProvidePanelState(panels)

</script>

<template>

  <TabGroup>
    <TabList>
      <template v-for="p in panels" :key="p.title">
        <Tab v-slot="{ selected }">
          <div>
            <i :class="p.icon" /> {{ p.title }}
          </div>
        </Tab>
      </template>
    </TabList>
    <TabPanels>
      <slot />
    </TabPanels>
  </TabGroup>
</template>
