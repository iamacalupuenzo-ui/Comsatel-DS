import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { Radio } from './radio';
import { RadioGroup } from './radio-group';

const meta: Meta<RadioGroup> = {
  title: 'Componentes/Radio/RadioGroup',
  component: RadioGroup,
  decorators: [moduleMetadata({ imports: [Radio, RadioGroup] })],
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
  },
  args: {
    label: 'Frecuencia de facturación',
    defaultValue: 'monthly',
    orientation: 'vertical',
    required: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<RadioGroup>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cs-radio-group
        [label]="label"
        [defaultValue]="defaultValue"
        [orientation]="orientation"
        [required]="required"
        [disabled]="disabled"
      >
        <cs-radio value="monthly" label="Mensual"></cs-radio>
        <cs-radio value="annual" label="Anual"></cs-radio>
      </cs-radio-group>
    `,
  }),
};

export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => ({
    props: args,
    template: `
      <cs-radio-group [label]="label" [defaultValue]="defaultValue" [orientation]="orientation">
        <cs-radio value="monthly" label="Mensual"></cs-radio>
        <cs-radio value="annual" label="Anual"></cs-radio>
      </cs-radio-group>
    `,
  }),
};

export const Validation: Story = {
  args: {
    label: 'Color',
    defaultValue: undefined,
    required: true,
    invalid: true,
    errorText: 'Elige un color para continuar.',
  },
  render: (args) => ({
    props: args,
    template: `
      <cs-radio-group
        [label]="label"
        [defaultValue]="defaultValue"
        [required]="required"
        [invalid]="invalid"
        [errorText]="errorText"
      >
        <cs-radio value="red" label="Rojo"></cs-radio>
        <cs-radio value="blue" label="Azul"></cs-radio>
      </cs-radio-group>
    `,
  }),
};
