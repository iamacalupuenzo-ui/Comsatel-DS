import type { Meta, StoryObj } from '@storybook/angular';
import { ListItem } from './list-item';

const meta: Meta<ListItem> = {
  title: 'Componentes/List item',
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    leadingIcon: { control: 'select', options: [null, 'truck', 'map-pin', 'file-text', 'user'] },
    trailingIcon: { control: 'select', options: [null, 'chevron-right', 'more-horizontal'] },
    selected: { control: 'boolean' }, selectable: { control: 'boolean' }, disabled: { control: 'boolean' },
  },
  args: { label: 'Reporte de mantenimiento', description: 'Actualizado hoy a las 09:30', leadingIcon: 'file-text' },
};
export default meta;
type Story = StoryObj<ListItem>;
export const Default: Story = {};
export const Selected: Story = { args: { selectable: true, selected: true } };
export const Disabled: Story = { args: { disabled: true } };
export const WithoutLeadingIcon: Story = { args: { leadingIcon: null, label: 'Reporte sin ícono' } };
export const WithoutTrailingIcon: Story = { args: { trailingIcon: null, label: 'Acción sin flecha' } };
export const WithoutIcons: Story = { args: { leadingIcon: null, trailingIcon: null, label: 'Abrir reporte' } };
export const LongContent: Story = { args: { label: 'Reporte de mantenimiento preventivo de la unidad asignada al recorrido norte', description: 'Actualizado hoy con observaciones de inspección y documentos adjuntos', leadingIcon: 'file-text' } };
