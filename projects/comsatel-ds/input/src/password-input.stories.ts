import type { Meta, StoryObj } from '@storybook/angular';
import { PasswordInput } from './password-input';

const meta: Meta<PasswordInput> = {
  title: 'Componentes/Input/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Password',
    autocomplete: 'current-password',
    placeholder: 'Enter your password',
  },
};

export default meta;
type Story = StoryObj<PasswordInput>;

export const Default: Story = {};

export const WithoutLeadingIcon: Story = {
  args: { leadingIcon: null },
};

export const Invalid: Story = {
  args: { invalid: true, value: 'invalid-password' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'disabled-password' },
};
export const Required: Story = { args: { required: true, ariaLabel: 'Contraseña requerida' } };
export const Readonly: Story = { args: { readonly: true, value: 'clave-de-ejemplo', ariaLabel: 'Contraseña de consulta' } };
export const AllSizes: Story = {
  render: () => ({ template: `<div style="display:grid;gap:var(--layout-gap-md);width:280px"><cs-password-input fieldSize="sm" aria-label="Contraseña pequeña" /><cs-password-input fieldSize="md" aria-label="Contraseña mediana" /><cs-password-input fieldSize="lg" aria-label="Contraseña grande" /></div>` }),
};
export const HoverAndFocus: Story = {
  parameters: { docs: { description: { story: 'Pasa el cursor por el campo y navega con Tab al input y al botón del ojo para verificar ambos focos visibles.' } } },
  render: () => ({ template: `<div style="width:280px"><cs-password-input aria-label="Contraseña interactiva" placeholder="Pasa el cursor y enfoca" /></div>` }),
};
