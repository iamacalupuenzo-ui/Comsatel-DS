import type { Meta, StoryObj } from '@storybook/angular';
import { Toggle } from './toggle';

const meta: Meta<Toggle> = {
  title: 'Componentes/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
    label: 'Etiqueta del toggle',
    disabled: false,
    checked: false,
  },
};

export default meta;
type Story = StoryObj<Toggle>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithDescription: Story = {
  args: {
    label: 'Modo oscuro',
    description: 'Cambia el tema de la interfaz a colores oscuros.',
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <cs-toggle size="sm" label="Tamaño sm" [checked]="true"></cs-toggle>
        <cs-toggle size="md" label="Tamaño md" [checked]="true"></cs-toggle>
        <cs-toggle size="lg" label="Tamaño lg" [checked]="true"></cs-toggle>
      </div>
    `,
  }),
};
