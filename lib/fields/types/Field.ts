export type Field = {
  id: string;
  label: {
    text: string;
    size?: 'h1';
  };
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

export type Option = {
  label: string;
  value: string;
} | {
  group: string
  options: Omit<Option, 'group' | 'options'>[];
};
