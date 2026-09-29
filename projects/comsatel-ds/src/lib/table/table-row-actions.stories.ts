import type { Meta, StoryObj } from '@storybook/angular';
import type { DropdownItem } from '../dropdown/dropdown-types';
import { TableRowActions } from './table-row-actions';

const items: DropdownItem[] = [
  { label: 'Ver detalle', value: 'view', icon: 'eye' },
  { label: 'Centrar en el mapa', value: 'map', icon: 'map-pin', dividerAfter: true },
  { label: 'Desactivar unidad', value: 'disable', icon: 'trash-2', variant: 'destructive' },
];

const meta: Meta<TableRowActions> = {
  title: 'Componentes/Table/Row actions',
  component: TableRowActions,
  tags: ['autodocs'],
  args: { items, ariaLabel: 'Acciones para Camión Norte 04', heading: 'Acciones' },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: flex-end; padding: 16px 16px 180px">
        <cs-table-row-actions [items]="items" [ariaLabel]="ariaLabel" [heading]="heading" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<TableRowActions>;

export const Default: Story = {};
export const WithoutHeading: Story = { args: { heading: '' } };
export const NoActions: Story = { args: { items: [] } };
