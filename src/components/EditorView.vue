<script setup lang="ts">
import type { ParentConfig } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/vue";
import { useProvideEditorState, type PathwayTemplate, useEditorState } from '@/components/EditorProvider'
import FieldCollectionResolver from './fields/FieldCollectionResolver.vue';
import type { Field } from '@/components/fields/types'

import TextField from '@/components/fields/TextField.vue';
import DateField from '@/components/fields/DateField.vue';
import RadiobuttonListField from '@/components/fields/RadiobuttonListField.vue';
import CheckboxListField from '@/components/fields/CheckboxListField.vue';
import NumberField from '@/components/fields/NumberField.vue';
import InlineContent from '@/components/ui/InlineContent.vue';
import type { FieldProps } from './fields';


const datasource = defineModel<PathwayTemplate>({ required: true })
const isEditor = ref(true)

watchEffect(() => {
  if (isEditor.value) {
    (document.body.parentNode as HTMLHtmlElement)!.dataset.editor = ''
  } else {
    delete (document.body.parentNode as HTMLHtmlElement)!.dataset.editor
  }
})

useProvideEditorState(isEditor, datasource)
const { currentField } = useEditorState()

const EmptyField = (props: FieldProps) => {
  return h('div', `Empty ${props.field.controlId}`)
}
const map = {

  //1107: LabelField,
  //1150: ContentField,
  //1152: HeadingField,
  //1124: ParagraphField,
  //1161: PasswordField,
  //1162: DividerField,
  1126: DateField,
  //1140: TimeField,
  1106: TextField,
  1157: NumberField,
  //1158: RatingField,
  //1160: DateTimeField,
  1105: CheckboxListField,
  1104: RadiobuttonListField,
  //1114: ScaleFieldList,
  //1116: MultiFieldSelect,
  //1117: LiveFieldSearch,
  //1103: DropdownField,
  //1101: YesFieldNoField,
  //1165: ConsentField,
  //1166: PanelField,
  //1167: RepeaterField,
  //1168: RowField,
  //1169: AddressField,
  //1170: ButtonField,
  //2000: ContainerField,
  //2001: GridField,
  //3100: MarkdownField,
}
const mapControl = ({ controlId }: Partial<Field>) => {
  return controlId && controlId in map ? map[controlId] : EmptyField ?? EmptyField
}

const [
  el,
  items] =
  useDragAndDrop(datasource.value.steps, {
    group: 'steps'
  })
</script>

<template>
  <label class="inline-flex gap-1 items-center editor:bg-slate-200 stacked">
    <div>
      <input type="checkbox" name="" id="" v-model="isEditor" class="size-5">
    </div>
    <span>Editor</span>
  </label>

  <section v-if="datasource">
    <div class="mb-4">
      <InlineContent v-model="datasource.title" class="inline text-3xl font-light" :enabled="isEditor" />
    </div>
    <div class="section space-y-4" ref="el">
      <template v-for="step in items" :key="step.id">
        <div class="border border-zinc-300 rounded p-4 bg-white editor:hover:border-orange-300 editor:hover:shadow-sm">
          <h3 class="mb-4">
            <InlineContent v-model="step.title" class="inline text-lg font-medium" :enabled="isEditor" />
          </h3>
          <FieldCollectionResolver :field="step" class="space-y-3" :depth="0" :index="-1" />
          <!-- <div class="space-y-3" ref="wrapper">
            <FieldsResolver :fields="step.fields" />
          </div> -->
        </div>
      </template>
    </div>
  </section>
  <pre>{{ { currentField } }}</pre>
</template>
