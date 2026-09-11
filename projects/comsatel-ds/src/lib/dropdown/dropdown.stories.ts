import type { Meta, StoryObj } from '@storybook/angular';
import { Dropdown } from './dropdown';

// El menú de Dropdown se abre/cierra con estado interno (signal) disparado
// por clic real — no expone un @Input para forzar el estado abierto. Las
// stories documentan el disparador en su estado cerrado por defecto;
// abrir el menú es una interacción que se prueba en vivo en la app de
// documentación, no en una captura estática de Storybook.
const meta: Meta<Dropdown> = {
  title: 'Componentes/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    trigger: {
      control: 'select',
      options: ['button', 'icon'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  args: {
    trigger: 'button',
    label: 'Options',
    size: 'sm',
    position: 'left',
    groups: [
      {
        items: [
          { label: 'Edit', icon: 'pencil' },
          { label: 'Duplicate', icon: 'copy' },
          { label: 'Delete', icon: 'trash-2', variant: 'destructive', dividerAfter: false },
        ],
      },
    ],
  },
};

export default meta;
type Story = StoryObj<Dropdown>;

export const ButtonTrigger: Story = {};

export const IconTrigger: Story = {
  args: { trigger: 'icon', ariaLabel: 'More actions' },
};

export const WithHeader: Story = {
  args: { header: 'Item actions' },
};

export const CheckboxGroup: Story = {
  args: {
    label: 'Filters',
    groups: [
      {
        header: 'Status',
        selectionMode: 'checkbox',
        items: [
          { label: 'Active', selected: true },
          { label: 'Archived', selected: false },
        ],
      },
    ],
  },
};

export const RadioGroup: Story = {
  args: {
    label: 'Sort by',
    groups: [
      {
        header: 'Order',
        selectionMode: 'radio',
        items: [
          { label: 'Newest', selected: true },
          { label: 'Oldest', selected: false },
        ],
      },
    ],
  },
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <cs-dropdown size="xs" label="xs" [groups]="groups"></cs-dropdown>
        <cs-dropdown size="sm" label="sm" [groups]="groups"></cs-dropdown>
        <cs-dropdown size="md" label="md" [groups]="groups"></cs-dropdown>
        <cs-dropdown size="lg" label="lg" [groups]="groups"></cs-dropdown>
      </div>
    `,
  }),
};
