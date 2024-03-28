<script setup lang="ts">
import { type PathwayTemplate } from '@/components/EditorProvider'
import Shell from '@/components/Shell.vue';
import EditorView from '@/components/EditorView.vue';
import GeneralPanel from '@/components/panels/General.vue';
import OptionsPanel from '@/components/panels/Options.vue';
import PathwayStepsPanel from '@/components/panels/PathwaySteps.vue';
import DATASET from '../components/ControlsForm'
import PanelGroup from '../components/panels/PanelGroup.vue'
import PanelGroupItem from '../components/panels/PanelGroupItem.vue'

const datasource = ref<PathwayTemplate>(DATASET)

const currentStep = ref(datasource.value.steps[0])

const components = [GeneralPanel, OptionsPanel]
</script>

<template>
  <Shell>
    <template #default>
      <main class=" bg-stone-50 max-w-screen-lg  mx-auto p-4">
        <EditorView v-model="datasource">
        </EditorView>

      </main>
    </template>
    <template v-slot:sidebar="context">
      <PanelGroup>
        <PanelGroupItem title="General" icon="fa fa-bolt">
          <GeneralPanel />
          <OptionsPanel />
        </PanelGroupItem>
        <PanelGroupItem title="Pathway Templates" icon="fa fa-cog">
          <PathwayStepsPanel />
        </PanelGroupItem>
      </PanelGroup>
      <!-- <GeneralPanel v-bind="context" /> -->
    </template>
  </Shell>
</template>
