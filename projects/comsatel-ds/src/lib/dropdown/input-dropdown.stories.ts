import type { Meta, StoryObj } from '@storybook/angular';
import { InputDropdown } from './input-dropdown';

const OPTIONS = [
  { label: 'Perú', value: 'pe' },
  { label: 'Colombia', value: 'co' },
  { label: 'Argentina', value: 'ar' },
  { label: 'México', value: 'mx' },
];

const meta: Meta<InputDropdown> = {
  title: 'Componentes/Dropdown/InputDropdown',
  component: InputDropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
  args: {
    label: 'País',
    placeholder: 'Selecciona un país',
    options: OPTIONS,
    size: 'md',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<InputDropdown>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: { value: 'pe' },
};

export const Disabled: Story = {
  args: { value: 'pe', disabled: true },
};

// `embedded` y `fullWidth` no tienen una demo propia como InputDropdown
// suelto en la página real — solo se usan compuestos dentro de InputGroup
// (ver Componentes/Input/InputGroup: LeadingDropdown/TrailingDropdown), que
// es donde el sistema real los documenta.

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 220px;">
        <cs-input-dropdown size="xs" label="xs" [options]="options" value="pe"></cs-input-dropdown>
        <cs-input-dropdown size="sm" label="sm" [options]="options" value="pe"></cs-input-dropdown>
        <cs-input-dropdown size="md" label="md" [options]="options" value="pe"></cs-input-dropdown>
        <cs-input-dropdown size="lg" label="lg" [options]="options" value="pe"></cs-input-dropdown>
      </div>
    `,
  }),
};
