import type { Meta, StoryObj } from '@storybook/angular';
import { Select, type SelectOption } from './select';

const teamOptions: SelectOption[] = [
  { label: 'Diseño', value: 'design' },
  { label: 'Ingeniería', value: 'engineering' },
  { label: 'Producto', value: 'product' },
  { label: 'Ventas', value: 'sales' },
];

const meta: Meta<Select> = {
  title: 'Componentes/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
  },
  args: {
    label: 'Equipo',
    placeholder: 'Selecciona un equipo…',
    options: teamOptions,
    size: 'md',
    disabled: false,
    multiple: false,
  },
};

export default meta;
type Story = StoryObj<Select>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'design' },
};

export const Multiple: Story = {
  args: { multiple: true, value: ['design', 'engineering'] },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'design' },
};

export const SecondaryLongValues: Story = {
  args: { surface: 'secondary', multiple: true, value: ['north', 'south'], options: [
    { value: 'north', label: 'Operación logística de la zona norte con seguimiento continuo de unidades' },
    { value: 'south', label: 'Operación de distribución y mantenimiento de la zona sur' },
  ] },
  render: args => ({ props: args, template: `
    <div style="width:min(100%, calc(var(--layout-size-lg) * 6))">
      <cs-select [label]="label" [surface]="surface" [multiple]="multiple" [options]="options" [value]="value" (valueChange)="value=$event" />
    </div>`,
  }),
};
