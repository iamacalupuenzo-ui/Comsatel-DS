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
