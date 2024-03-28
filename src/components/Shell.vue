<script setup lang="ts">
import PanelGroup from './panels/PanelGroup.vue'
import PanelGroupItem from './panels/PanelGroupItem.vue'
import GeneralPanel from './panels/General.vue'
import OptionsPanel from './panels/Options.vue'
// type Props = { }
// const { } = defineProps<Props>()
// const emits = defineEmits()
</script>

<template>

  <div class="grid grid-cols-[minmax(0,theme(spacing.80)),minmax(768px,1fr),auto] h-screen w-full min-w-max ">

    <div class="bg-orange-100"></div>
    <div class="bg-red-200 overflow-y-auto">
      <slot />
    </div>
    <div class="bg-blue-100 w-96">
      <slot name="sidebar">
        <PanelGroup>
          <PanelGroupItem title="General" icon="fa fa-bolt">
            <GeneralPanel />
            <OptionsPanel />
          </PanelGroupItem>
        </PanelGroup>
      </slot>
    </div>

  </div>

</template>
