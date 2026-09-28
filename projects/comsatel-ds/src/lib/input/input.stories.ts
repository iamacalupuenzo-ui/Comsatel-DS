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
export const Required: Story = { args: { required: true, ariaLabel: 'Correo requerido' } };
export const Readonly: Story = { args: { readonly: true, value: 'Solo lectura', ariaLabel: 'Dato de consulta' } };
export const AppliedFilter: Story = { args: { active: true, value: 'Unidades activas', ariaLabel: 'Filtro aplicado' } };
export const FocusAndHover: Story = {
  render: () => ({ template: `<div style="display:grid; gap:var(--layout-gap-md); width:260px"><cs-input placeholder="Pasa el cursor aquí" aria-label="Estado hover" /><cs-input placeholder="Enfoca con Tab" aria-label="Estado de foco" /></div>` }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: var(--layout-gap-md); width: 260px;">
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
      <div style="display: flex; flex-direction: column; gap: var(--layout-gap-md); width: 260px;">
        <cs-input placeholder="Por defecto"></cs-input>
        <cs-input [disabled]="true" placeholder="Deshabilitado"></cs-input>
        <cs-input [invalid]="true" placeholder="Inválido"></cs-input>
        <cs-input [required]="true" aria-label="Requerido" placeholder="Requerido"></cs-input>
        <cs-input [active]="true" value="Filtro aplicado" aria-label="Filtro aplicado"></cs-input>
        <cs-input [readonly]="true" value="Solo lectura" aria-label="Solo lectura"></cs-input>
      </div>
    `,
  }),
};
