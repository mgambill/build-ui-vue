<script setup lang="ts">
import TextField from './TextField.vue';
import DateField from './DateField.vue';
import RadiobuttonListField from './RadiobuttonListField.vue';
import CheckboxListField from './CheckboxListField.vue';
import NumberField from './NumberField.vue';
import RowField from './RowField.vue';
import ParagraphField from './ParagraphField.vue';
import PasswordField from './PasswordField.vue';
import DividerField from './DividerField.vue';
import DateTimeField from './DateTimeField.vue';
import TimeField from './TimeField.vue';
import DropdownField from './SelectField.vue';
import AddressField from './AddressField.vue';
import HeadingField from './HeadingField.vue'
import PanelField from './PanelField.vue'
import LabelField from './LabelField.vue'
import YesNoField from './YesNoField.vue';
import ConsentField from './ConsentField.vue'
import ContainerField from './ContainerField.vue'
import RepeaterField from './RepeaterField.vue'
import SelectField from './SelectField.vue'

import type { FieldProps } from './';



const { field, index, depth, parent } = defineProps<FieldProps>()


const EmptyField = (props: FieldProps) => {
  return h('div', `Empty ${props.field.controlId} ${props.field.label?.text}`)
}
const map = {

  1107: LabelField,
  //1150: ContentField,
  1152: HeadingField,
  1124: ParagraphField,
  1161: PasswordField,
  1162: DividerField,
  1126: DateField,
  1140: TimeField,
  1106: TextField,
  1157: NumberField,
  //1158: RatingField,
  1160: DateTimeField,
  1105: CheckboxListField,
  1104: RadiobuttonListField,
  //1114: ScaleFieldList,
  //1116: MultiFieldSelect,
  //1117: LiveFieldSearch,
  1103: SelectField,
  1101: YesNoField,
  1165: ConsentField,
  1166: PanelField,
  1167: RepeaterField,
  1168: RowField,
  1169: AddressField,
  //1170: ButtonField,
  2000: ContainerField,
  //2001: GridField,
  //3100: MarkdownField,
}
const comp = map[field.controlId] ?? EmptyField

</script>

<template>
  <Component :is="comp" :field :index :depth :parent />
</template>