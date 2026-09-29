import type { Meta, StoryObj } from '@storybook/angular';
import { Table } from './table';
import type { TableColumn, TableRow } from './table-types';

const columns: TableColumn[] = [
  { key: 'unit', label: 'Unidad', isSortable: true, width: '40%' },
  { key: 'status', label: 'Estado', isSortable: true, width: '30%' },
  { key: 'updated', label: 'Actualizado', isSortable: true, align: 'right' },
];
const rows: TableRow[] = [
  { key: 'north-04', cells: ['Camión Norte 04', 'Activo', 'hace 2 min'] },
  { key: 'south-12', cells: ['Furgón Sur 12', 'Sin señal', 'hace 3 h'] },
  { key: 'center-09', cells: ['Furgón Centro 09', 'Detenido', 'hace 26 min'] },
];

const meta: Meta<Table> = {
  title: 'Componentes/Table',
  component: Table,
  tags: ['autodocs'],
  args: { columns, rows, caption: 'Unidades de flota', sortKey: 'unit', sortOrder: 'asc' },
  render: (args) => ({ props: args, template: '<cs-table [columns]="columns" [rows]="rows" [caption]="caption" [sortKey]="sortKey" [sortOrder]="sortOrder" [isLoading]="isLoading" [skeletonRowCount]="skeletonRowCount" [minWidth]="minWidth"></cs-table>' }),
};

export default meta;
type Story = StoryObj<Table>;

export const Default: Story = {};
export const Descending: Story = { args: { sortKey: 'updated', sortOrder: 'desc' } };
export const InitialLoading: Story = { args: { rows: [], isLoading: true, skeletonRowCount: 4 } };
export const Refetching: Story = { args: { isLoading: true } };
export const HorizontalScroll: Story = { args: { minWidth: '40rem' } };

export const Empty: Story = {
  args: { rows: [] },
  render: (args) => ({ props: args, template: '<cs-table [columns]="columns" [rows]="rows" [caption]="caption"><div emptyState style="padding: 24px; text-align: center;">No hay unidades disponibles.</div></cs-table>' }),
};

/** Columna de acciones fija al final: queda a la vista al desplazar y muestra sombra mientras hay contenido oculto. */
export const StickyActions: Story = {
  args: {
    minWidth: '48rem',
    columns: [...columns, { key: 'actions', label: 'Acciones', width: '88px', align: 'center', sticky: 'end' }],
    rows: rows.map((row) => ({ ...row, cells: [...row.cells, 'Ver'] })),
  },
};

export const LoadError: Story = {
  args: { rows: [] },
  render: (args) => ({ props: { ...args, onRetry: () => undefined }, template: '<cs-table [columns]="columns" [rows]="rows" [caption]="caption" error="No pudimos cargar las unidades" (retry)="onRetry()"></cs-table>' }),
};
