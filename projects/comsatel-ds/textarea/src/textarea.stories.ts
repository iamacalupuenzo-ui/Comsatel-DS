import type { Meta, StoryObj } from '@storybook/angular';
import { Textarea } from './textarea';

const meta: Meta<Textarea> = {
  title: 'Componentes/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    resize: { control: 'select', options: ['vertical', 'none'] },
  },
  args: {
    label: 'Descripción de la observación',
    placeholder: 'Describe la observación',
    value: '',
    rows: 3,
    resize: 'vertical',
    required: false,
    invalid: false,
    errorMessage: '',
    helperText: '',
    readonly: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 360px">
        <cs-textarea
          [label]="label"
          [placeholder]="placeholder"
          [value]="value"
          [rows]="rows"
          [maxLength]="maxLength"
          [resize]="resize"
          [required]="required"
          [invalid]="invalid"
          [errorMessage]="errorMessage"
          [helperText]="helperText"
          [readonly]="readonly"
          [disabled]="disabled"
        />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Textarea>;

export const Default: Story = {};
export const WithCounter: Story = { args: { maxLength: 120, value: 'Unidad ubicada en el centro comercial; se coordina con la comisaría.' } };
export const WithHelper: Story = { args: { helperText: 'Incluye la dirección y la hora aproximada.' } };
export const Invalid: Story = { args: { required: true, invalid: true, errorMessage: 'Describe la observación antes de continuar.' } };
export const Readonly: Story = { args: { readonly: true, value: 'La unidad se ubicó en el estacionamiento del centro comercial.' } };
export const Disabled: Story = { args: { disabled: true } };
