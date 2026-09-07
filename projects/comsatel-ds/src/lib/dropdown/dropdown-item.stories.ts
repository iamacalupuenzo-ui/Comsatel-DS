import type { Meta, StoryObj } from '@storybook/angular';
import { DropdownItemComponent } from './dropdown-item';

const meta: Meta<DropdownItemComponent> = {
  title: 'Componentes/Dropdown/DropdownItem',
  component: DropdownItemComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'checkbox', 'radio'],
    },
  },
  args: {
    size: 'sm',
    selectionMode: 'none',
    item: { label: 'Editar' },
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 220px; border: 1px solid var(--color-border-base-default); border-radius: var(--radius-md); overflow: hidden;"><cs-dropdown-item [item]="item" [size]="size" [selectionMode]="selectionMode"></cs-dropdown-item></div>`,
  }),
};

export default meta;
type Story = StoryObj<DropdownItemComponent>;

export const Default: Story = {};

export const WithIcon: Story = {
  args: { item: { label: 'Editar', icon: 'pencil' } },
};

export const WithShortcut: Story = {
  args: { item: { label: 'Guardar', icon: 'save', shortcut: '⌘S' } },
};

export const WithBadge: Story = {
  args: { item: { label: 'Nuevo', badge: 'Beta' } },
};

export const Destructive: Story = {
  args: { item: { label: 'Eliminar', icon: 'trash-2', variant: 'destructive' } },
};

export const Success: Story = {
  args: { item: { label: 'Ítem success', variant: 'success' } },
};

export const Disabled: Story = {
  args: { item: { label: 'No disponible', disabled: true } },
};

export const CheckboxSelected: Story = {
  args: { selectionMode: 'checkbox', item: { label: 'Mostrar archivados', selected: true } },
};

export const RadioSelected: Story = {
  args: { selectionMode: 'radio', item: { label: 'Más reciente', selected: true } },
};
