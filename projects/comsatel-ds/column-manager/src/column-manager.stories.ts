import type { Meta, StoryObj } from '@storybook/angular';
import { ColumnManager, type ColumnManagerItem } from './column-manager';

const columns: ColumnManagerItem[] = [
  { key: 'unit', label: 'Unidad', visible: true },
  { key: 'status', label: 'Estado', visible: true },
  { key: 'driver', label: 'Conductor', visible: true },
  { key: 'updated', label: 'Actualizado', visible: true },
];

const meta: Meta<ColumnManager> = {
  title: 'Componentes/ColumnManager',
  component: ColumnManager,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
  },
  args: {
    label: 'Columnas',
    columns,
    size: 'sm',
    disabled: false,
    minVisible: 1,
  },
};

export default meta;
type Story = StoryObj<ColumnManager>;

export const Default: Story = {};

export const PartialVisibility: Story = {
  args: {
    columns: columns.map((column) => column.key === 'driver' ? { ...column, visible: false } : column),
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
