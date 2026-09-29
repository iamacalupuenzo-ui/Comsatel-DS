import type { Meta, StoryObj } from '@storybook/angular';
import { Checkbox } from './checkbox';

const meta: Meta<Checkbox> = {
  title: 'Componentes/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
    label: 'Etiqueta del checkbox',
    disabled: false,
    indeterminate: false,
    checked: false,
  },
};

export default meta;
type Story = StoryObj<Checkbox>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Notificaciones por correo',
    description: 'Recibe un resumen diario de la actividad de tu cuenta.',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <cs-checkbox size="sm" label="Tamaño sm" [checked]="true"></cs-checkbox>
        <cs-checkbox size="md" label="Tamaño md" [checked]="true"></cs-checkbox>
        <cs-checkbox size="lg" label="Tamaño lg" [checked]="true"></cs-checkbox>
      </div>
    `,
  }),
};
