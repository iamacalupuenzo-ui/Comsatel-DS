import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Input } from '../input/input';
import { FormField } from './form-field';

const meta: Meta<FormField> = {
  title: 'Componentes/Form field',
  component: FormField,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Input] })],
  args: {
    for: 'unit-code',
    label: 'Código de unidad',
    required: true,
    helperText: 'Placa o código interno de la unidad.',
    errorMessage: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 320px">
        <cs-form-field [for]="for" [label]="label" [required]="required" [helperText]="helperText" [errorMessage]="errorMessage">
          <cs-input
            [id]="for"
            [required]="required"
            [invalid]="!!errorMessage"
            [aria-describedby]="!errorMessage && helperText ? for + '-help' : ''"
            [aria-errormessage]="errorMessage ? for + '-error' : ''"
          />
        </cs-form-field>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<FormField>;

export const Default: Story = {};
export const WithError: Story = { args: { errorMessage: 'Ingresa el código de la unidad.' } };
export const WithoutMessage: Story = { args: { helperText: '', required: false } };
