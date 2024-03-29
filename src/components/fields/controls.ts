import type { FieldProps } from '.'
import type { ClassificationDefinition, ClassificationDefinitionType, ControlDefinition } from './types'

const emptyField = defineComponent(
  ({ field }: FieldProps) => {
    const c = controls.find(c => c.id === field.controlId)
    return () => h('div', null, c?.fieldName ?? field.controlId)
  },
  { props: ['field'] }
)

export const controls: ControlDefinition[] = [
  {
    id: 1107,
    name: 'Label',
    fieldKey: 'LabelField',
    fieldName: 'HeadingField',
    isList: false,
    isQuestion: false,
    isContainer: false,
    isComposite: false,
    isResizable: false,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    icon: 'fa-light fa-tag',
    category: 'markup',
    classification: 'literals',
    component: () => import('./LabelField.vue')
  },
  {
    id: 1150,
    name: 'Content',
    fieldKey: 'ContentField',
    fieldName: 'ContentField',
    isList: false,
    isQuestion: false,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: true,
    hasLabel: true,
    icon: 'fa-light fa-pen-ruler',
    category: 'markup',
    classification: 'literals',
    component: () => import('./ContentField.vue')
  },
  {
    id: 1152,
    name: 'Heading',
    fieldKey: 'HeadingField',
    fieldName: 'HeadingField',
    isList: false,
    isQuestion: false,
    isContainer: false,
    isComposite: false,
    isResizable: false,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    properties: {
      size: {
        type: 'array',
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5'],
      },
    },
    icon: 'fa-light fa-h1',
    category: 'markup',
    classification: 'literals',
    component: () => import('./HeadingField.vue')
  },
  {
    id: 1124,
    name: 'Paragraph Text',
    fieldKey: 'ParagraphField',
    fieldName: 'ParagraphField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'string',
    icon: 'fa-light fa-memo-pad',
    category: 'question',
    classification: 'inputs',
    component: () => import('./ParagraphField.vue')
  },
  {
    id: 1161,
    name: 'Password Text',
    fieldKey: 'PasswordField',
    fieldName: 'PasswordField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'string',
    icon: 'fa-light fa-key',
    category: 'question',
    classification: 'inputs',
    component: () => import('./PasswordField.vue')
  },
  {
    id: 1162,
    name: 'Divider',
    fieldKey: 'DividerField',
    fieldName: 'DividerField',
    isList: false,
    isQuestion: false,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    icon: 'fa-light fa-file-dashed-line',
    category: 'markup',
    classification: 'literals',
    component: () => import('./DividerField.vue')
  },
  {
    id: 1126,
    name: 'Date Picker',
    fieldKey: 'DateField',
    fieldName: 'DateField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    properties: {
      valueType: {
        type: 'array',
        options: ['Date', 'Age', 'Period'],
      },
    },
    type: 'Date',
    icon: 'fa-light fa-calendar ',
    category: 'datetime',
    classification: 'inputs',
    component: () => import('./DateField.vue')
  },
  {
    id: 1140,
    name: 'Time Picker',
    fieldKey: 'TimeField',
    fieldName: 'TimeField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'Date',
    icon: 'fa-light fa-clock',
    category: 'datetime',
    classification: 'inputs',
    component: () => import('./TimeField.vue')
  },
  {
    id: 1106,
    name: 'Singleline Text',
    fieldKey: 'TextField',
    fieldName: 'TextField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    properties: {
      type: {
        type: 'array',
        options: ['string', 'Website', 'Email', 'Phone'],
        defaultValue: 'string'
      },
    },
    type: 'string',
    icon: 'fa-light fa-input-text',
    category: 'question',
    classification: 'inputs',
    component: () => import('./TextField.vue')
  },
  {
    id: 1157,
    name: 'Number',
    fieldKey: 'NumberField',
    fieldName: 'NumberField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    properties: {
      min: {
        type: 'number',
      },
      max: {
        type: 'number',
      },
      step: {
        type: 'number',
      },
    },
    type: 'Number',
    icon: 'fa-light fa-input-numeric',
    category: 'question',
    classification: 'inputs',
    component: () => import('./NumberField.vue')
  },
  {
    id: 1158,
    name: 'Rating',
    fieldKey: 'RatingField',
    fieldName: 'RatingField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: false,
    hasContent: false,
    hasLabel: true,
    type: 'Number',
    icon: 'fa-light fa-star',
    category: 'compound',
    classification: 'inputs',
    component: () => import('./RatingField.vue')
  },
  {
    id: 1160,
    name: 'Date Time Picker',
    fieldKey: 'DateTimePicker',
    fieldName: 'DateTimePicker',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: false,
    hasContent: false,
    hasLabel: true,
    type: 'Date',
    icon: 'fa-light fa-calendar-clock ',
    category: 'datetime',
    classification: 'inputs',
    component: () => import('./DateTimeField.vue')
  },
  {
    id: 1105,
    name: 'Checkbox List',
    fieldKey: 'CheckboxListField',
    fieldName: 'ChoiceField',
    isList: true,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'Object',
    properties: {
      direction: {
        label: 'Option Direction',
        type: 'array',
        options: [null, 'horizontal', 'vertical'],
      },
      allowOther: {
        label: 'Allow Other',
        type: 'boolean',
        nullable: true,
        defaultValue: true,
      },
      repeatcolumns: {
        type: 'number',
        label: 'Repeat Columns',
        placeholder: 'Auto',
      },
    },
    icon: 'fa-light fa-list',
    category: 'list',
    classification: 'lists',
    component: () => import('./CheckboxListField.vue')
  },
  {
    id: 1104,
    name: 'RadiobuttonList',
    fieldKey: 'RadiobuttonListField',
    fieldName: 'ChoiceField',
    isList: true,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'Object',
    properties: {
      direction: {
        label: 'Option Direction',
        type: 'array',
        options: ['', 'horizontal', 'vertical'],
      },
      allowOther: {
        label: 'Allow Other',
        type: 'boolean',
        nullable: true,
      },
      repeatcolumns: {
        type: 'number',
        label: 'Repeat Columns',
        placeholder: 'Auto',
      },
      allowNull: {
        label: 'Allow Null',
        type: 'boolean',
        nullable: true,
        defaultValue: true,
      },
    },
    icon: 'fa-light fa-list-radio',
    category: 'list',
    classification: 'lists',
    component: () => import('./RadiobuttonListField.vue')
  },
  {
    id: 1114,
    name: 'Scale List',
    fieldKey: 'ScaleListField',
    fieldName: 'ScaleListField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: true,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'number',
    properties: {
      firstLabel: {
        label: 'First Label',
        type: 'string',
      },
      lastLabel: {
        label: 'Fast Label',
        type: 'string',
      },
      min: {
        type: 'number',
      },
      max: {
        type: 'number',
      },
    },
    icon: 'fa-light fa-scale-balanced',
    category: 'list',
    classification: 'advanced',
    component: emptyField
  },
  {
    id: 1116,
    name: 'Multi Select',
    fieldKey: 'MultiSelectField',
    fieldName: 'MultiSelectField',
    isList: true,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    icon: 'fa-light fa-list-check',
    category: 'list',
    classification: 'lists',
    component: emptyField
  },
  {
    id: 1117,
    name: 'Live Search',
    fieldKey: 'TypeAheadField',
    fieldName: 'TypeAheadField',
    isList: true,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    icon: 'fa-light fa-bolt',
    category: 'question',
    classification: 'lists',
    component: emptyField
  },
  {
    id: 1103,
    name: 'Dropdown',
    fieldKey: 'DropdownField',
    fieldName: 'DropdownField',
    isList: true,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'Object',
    icon: 'fa-light fa-list-dropdown',
    category: 'list',
    classification: 'lists',
    component: () => import('./SelectField.vue')
  },
  {
    id: 1101,
    name: 'Yes / No',
    fieldKey: 'YesNoField',
    fieldName: 'YesNoField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'boolean',
    properties: {
      layout: {
        type: 'array',
        options: ['dropdown', 'radio list'],
      },
    },
    icon: 'fa-light fa-toggle-on',
    category: 'boolean',
    classification: 'inputs',
    component: () => import('./Field.vue')
  },
  {
    id: 1165,
    name: 'Consent',
    fieldKey: 'ConsentField',
    fieldName: 'ConsentField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: true,
    hasLabel: true,
    type: 'boolean',
    icon: 'fa-light fa-memo-circle-check',
    category: 'boolean',
    classification: 'inputs',
    component: () => import('./Field.vue')
  },
  {
    id: 1166,
    name: 'Panel',
    fieldKey: 'PanelField',
    fieldName: 'PanelField',
    isList: false,
    isQuestion: false,
    isContainer: true,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'Container',
    icon: 'fa-light fa-credit-card-blank fa-flip-vertical',
    category: 'container',
    classification: 'panels',
    component: () => import('./Field.vue')
  },
  {
    id: 1167,
    name: 'Repeater',
    fieldKey: 'RepeaterField',
    fieldName: 'RepeaterField',
    isList: true,
    isQuestion: false,
    isContainer: true,
    isComposite: true,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    properties: {
      'button-Label': {
        type: 'string',
      },
    },
    icon: 'fa-light  fa-rectangle-history-circle-plus',
    category: 'compound',
    classification: 'advanced',
    component: () => import('./Field.vue')
  },
  {
    id: 1168,
    name: 'Row',
    fieldKey: 'RowField',
    fieldName: 'RowField',
    isList: false,
    isQuestion: false,
    isContainer: true,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: false,
    type: 'Container',
    icon: 'fa-light fa-columns-3',
    category: 'container',
    classification: 'panels',
    component: () => import('./Field.vue')
  },
  {
    id: 1169,
    name: 'Address',
    fieldKey: 'AddressField',
    fieldName: 'AddressField',
    isList: false,
    isQuestion: true,
    isContainer: false,
    isComposite: true,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    icon: 'fa-light fa-address-card',
    category: 'compound',
    classification: 'advanced',
    component: () => import('./Field.vue')
  },
  {
    id: 1170,
    name: 'Button',
    fieldKey: 'ButtonField',
    fieldName: 'ButtonField',
    isList: false,
    isQuestion: false,
    isContainer: false,
    isComposite: false,
    isResizable: false,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    properties: {
      theme: {
        type: 'array',
        options: ['primary', 'secondary', 'danger', 'success'],
      },
      outline: {
        type: 'boolean',
      },
      text: {
        type: 'string',
      },
    },
    icon: 'fa-light fa-rectangle',
    category: 'markup',
    classification: 'literals',
    component: () => import('./Field.vue')
  },
  {
    id: 2000,
    name: 'Container',
    fieldKey: 'ContainerField',
    fieldName: 'PanelField',
    isList: false,
    isQuestion: false,
    isContainer: true,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: false,
    type: 'Container',
    icon: 'fa-light fa-square-dashed',
    category: 'container',
    classification: 'panels',
    component: () => import('./Field.vue')
  },
  {
    id: 2001,
    name: 'Grid',
    fieldKey: 'GridField',
    fieldName: 'GridField',
    isList: false,
    isQuestion: false,
    isContainer: true,
    isComposite: true,
    isResizable: true,
    isActive: true,
    hasContent: false,
    hasLabel: true,
    type: 'Container',
    icon: 'fa-light fa-table',
    category: 'container',
    properties: {
      allowRowDelete: {
        type: 'boolean',
      },
      allowRowMove: {
        type: 'boolean',
      },
      allowRowAdd: {
        type: 'boolean',
      },
      columns: {
        type: 'array',
        options: [],
      },
    },
    classification: 'advanced',
    component: () => import('./Field.vue')
  },
  {
    id: 3100,
    name: 'Markdown',
    fieldKey: 'MarkdownField',
    fieldName: 'MarkdownField',
    isList: false,
    isQuestion: false,
    isContainer: false,
    isComposite: false,
    isResizable: true,
    isActive: true,
    hasContent: true,
    hasLabel: true,
    type: 'Container',
    icon: 'fab fa-markdown',
    category: 'markup',
    classification: 'literals',
    component: () => import('./Field.vue')
  },
]

export const classify = (c: ControlDefinition): ClassificationDefinitionType => {
  if (c.isComposite) return 'advanced'
  else if (c.isList) return 'lists'
  else if (c.isContainer) return 'panels'
  else if (c.isQuestion) return 'inputs'
  return 'literals'
}

export const getControlDefinition = (controLId: number) => controls.find((c) => c.id === controlId)

export const getClassificationDefinition = (controLId: number) => {
  const def = getControlDefinition(controlId)
  if (!def) return null
  const cls = classify(def)
  return classificationDefinition[cls]
}

const classifyControls = () => {
  const map = new Map<ClassificationDefinitionType, ControlDefinition[]>()

  for (const c of controls) {
    const type = c.classification
    if (!map.has(type)) map.set(type, [])

    map.get(type)?.push(c)
  }
  return map
}

const results = classifyControls()

export const classificationDefinition: Record<ClassificationDefinitionType, ClassificationDefinition> = {
  panels: {
    label: 'Panels',
    key: 'panels',
    fillColor: 'bg-sky-100',
    textColor: 'text-sky-700',
  },
  literals: {
    label: 'Literals',
    key: 'literals',
    fillColor: 'bg-fuchsia-100',
    textColor: 'text-fuchsia-700',
  },
  inputs: {
    label: 'Inputs',
    key: 'inputs',
    fillColor: 'bg-orange-100',
    textColor: 'text-orange-700',
  },
  lists: {
    label: 'Lists',
    key: 'lists',
    fillColor: 'bg-orange-100',
    textColor: 'text-orange-700',
  },
  advanced: {
    label: 'Advanced',
    key: 'advanced',
    fillColor: 'bg-orange-100',
    textColor: 'text-orange-700',
  },
}

export const groupedControls = Object.values(classificationDefinition).map((c) => ({
  ...c,
  controls: results.get(c.key),
}))