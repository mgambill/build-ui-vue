<script setup lang="ts">

import type { Field } from '@/components/fields/types'

import SinglelineField from '@/components/fields/SinglelineField.vue';
import DateField from '@/components/fields/DateField.vue';
import RadiobuttonListField from '@/components/fields/RadiobuttonListField.vue';
import CheckboxListField from '@/components/fields/CheckboxListField.vue';
import NumberField from '@/components/fields/NumberField.vue';
import RowField from '@/components/fields/RowField.vue';
import ParagraphField from '@/components/fields/ParagraphField.vue';
import PasswordField from '@/components/fields/PasswordField.vue';
import DividerField from '@/components/fields/DividerField.vue';
import DateTimeField from '@/components/fields/DateTimeField.vue';
import TimeField from '@/components/fields/TimeField.vue';
import DropdownField from '@/components/fields/DropdownField.vue';
import AddressField from '@/components/fields/AddressField.vue';

import type { FieldProps } from './';

type Props = {
  fields?: Partial<Field>[]
}

const { fields = [] } = defineProps<Props>()


const EmptyField = (props: FieldProps) => {
  return h('div', `Empty ${props.field.controlId} ${props.field.label?.text}`)
}
const map = {

  //1107: LabelField,
  //1150: ContentField,
  //1152: HeadingField,
  1124: ParagraphField,
  1161: PasswordField,
  1162: DividerField,
  1126: DateField,
  1140: TimeField,
  1106: SinglelineField,
  1157: NumberField,
  //1158: RatingField,
  1160: DateTimeField,
  1105: CheckboxListField,
  1104: RadiobuttonListField,
  //1114: ScaleFieldList,
  //1116: MultiFieldSelect,
  //1117: LiveFieldSearch,
  1103: DropdownField,
  //1101: YesFieldNoField,
  //1165: ConsentField,
  //1166: PanelField,
  //1167: RepeaterField,
  1168: RowField,
  1169: AddressField,
  //1170: ButtonField,
  //2000: ContainerField,
  //2001: GridField,
  //3100: MarkdownField,
}
const mapControl = ({ controlId }: Partial<Field>) => {
  return controlId && controlId in map ? map[controlId] : EmptyField ?? EmptyField
}
</script>

<template>
  <template v-for="(field, index) in fields" :key="field.id">
    <slot :as="mapControl(field)" :field="field" :index="index" :depth="0" :fields="fields">
      <Component :is="mapControl(field)" :field="field" :index="index" :depth="0" :fields="fields" />
    </slot>
  </template>
</template>
