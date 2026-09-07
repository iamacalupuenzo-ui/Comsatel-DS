import type { Meta, StoryObj } from '@storybook/angular';
import { Input } from './input';

const meta: Meta<Input> = {
  title: 'Componentes/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    fieldSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date', 'search', 'tel'],
    },
  },
  args: {
    fieldSize: 'md',
    type: 'text',
    placeholder: 'Ingresa un valor',
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj<Input>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, placeholder: 'Deshabilitado' },
};

export const Invalid: Story = {
  args: { invalid: true, placeholder: 'Inválido' },
};

export const WithValue: Story = {
  args: { value: 'tu@ejemplo.com', type: 'email' },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; width: 260px;">
        <cs-input fieldSize="sm" placeholder="Pequeño (28px)"></cs-input>
        <cs-input fieldSize="md" placeholder="Mediano — por defecto (32px)"></cs-input>
        <cs-input fieldSize="lg" placeholder="Grande (40px)"></cs-input>
      </div>
    `,
  }),
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; width: 260px;">
        <cs-input placeholder="Por defecto"></cs-input>
        <cs-input [disabled]="true" placeholder="Deshabilitado"></cs-input>
        <cs-input [invalid]="true" placeholder="Inválido"></cs-input>
      </div>
    `,
  }),
};
