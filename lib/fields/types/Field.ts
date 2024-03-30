import type { StringDictionary } from "./primitives";
import type { RelationId } from "./primitives";

export type FieldCollection = Field[]

export type Field = {
  id: string;
  label: {
    text: string;
    size?: 'h1';
    visibility?: 'visible' | 'hidden' | 'invisible' | undefined
  };
  property?: string
  controlId: number | string
  props?: StringDictionary<any>
  attrs?: StringDictionary<string>
  fields?: FieldCollection
  options?: Option[]
  content?: string
  defaultValue?: any
} & ({
  control: 'row' | 'panel' | 'container' | 'repeater';
  fields: Field[];
} | {
  control: 'text' | 'paragraph' | 'number' | 'date' | 'time' | 'datetime' | 'password' | 'label' | 'heading' | 'numeric' | 'address' | 'yesno' | 'divider' | 'consent';
} | {
  control: 'radiolist' | 'checkboxlist';
  props: {
    'direction': 'vertical' | 'horizontal';
  };
  options: Option[];
} | {
  control: 'dropdown' | 'multiselect';
  options: Option[];
  });

export type Property = {
  label?: string
  nullable?: boolean
  defaultValue?: any
} & (
    | {
      type: 'checkbox'
      defaultValue?: boolean
    }
    | {
      type: 'text'
      defaultValue?: string
      placeholder?: string
    }
    | {
      type: 'number'
      defaultValue?: number
      placeholder?: string
    }
    | {
      type: 'select'
      options: (string | Option)[]
      defaultValue?: string | Option['value']
    }
    | {
      type: 'multiselect'
      options: (string | Option)[]
      defaultValue?: (string | Option['value'])[]
    }
  )


export type Option = {
  label: string;
  value: string | number | null | boolean
  icon?: string
} | {
  group: string
  options: Omit<Option, 'group' | 'options'>[];
};

export type SlotRecord = Record<string, { label: string; fields: FieldCollection }>

export type Form = {
  name: string
  title: string
  application: RelationId
  description: string
  template: 'tabs' | 'simple' | 'wizard'
  slots: SlotRecord
  $meta?: any
}