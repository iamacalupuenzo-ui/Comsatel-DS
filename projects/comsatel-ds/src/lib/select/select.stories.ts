import type { Meta, StoryObj } from '@storybook/angular';
import { Select, type SelectOption } from './select';

const teamOptions: SelectOption[] = [
  { label: 'Diseño', value: 'design' },
  { label: 'Ingeniería', value: 'engineering' },
  { label: 'Producto', value: 'product' },
  { label: 'Ventas', value: 'sales' },
];

const meta: Meta<Select> = {
  title: 'Componentes/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
  },
  args: {
    label: 'Equipo',
    placeholder: 'Selecciona un equipo…',
    options: teamOptions,
    size: 'md',
    disabled: false,
    multiple: false,
  },
};

export default meta;
type Story = StoryObj<Select>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { value: 'design' },
};

export const Multiple: Story = {
  args: { multiple: true, value: ['design', 'engineering'] },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'design' },
};

export const SecondaryLongValues: Story = {
  args: { surface: 'secondary', multiple: true, value: ['north', 'south'], options: [
    { value: 'north', label: 'Operación logística de la zona norte con seguimiento continuo de unidades' },
    { value: 'south', label: 'Operación de distribución y mantenimiento de la zona sur' },
  ] },
  render: args => ({ props: args, template: `
    <div style="width:min(100%, calc(var(--layout-size-lg) * 6))">
      <cs-select [label]="label" [surface]="surface" [multiple]="multiple" [options]="options" [value]="value" (valueChange)="value=$event" />
    </div>`,
  }),
};

const unitTypes: SelectOption[] = [
  { label: 'Automóvil', value: 'car' },
  { label: 'Camión', value: 'truck' },
  { label: 'Bus', value: 'bus' },
  { label: 'Motocicleta', value: 'moto' },
];

/**
 * Filtro múltiple de barra: resumen de una línea, estado aplicado y menú ajustado al campo.
 * Ninguna o todas las opciones marcadas equivalen a «todos» y el filtro deja de verse aplicado.
 */
export const MultipleSummaryFilter: Story = {
  render: () => ({
    props: {
      options: unitTypes,
      value: ['car', 'truck'],
      isFiltering: (value: string[]) => value.length > 0 && value.length < unitTypes.length,
      summary: (count: number) => `${count} tipos seleccionados`,
    },
    template: `
      <div style="display: grid; gap: 12px; width: 200px;">
        <cs-select label="Tipo de unidad" placeholder="Todos los tipos" [multiple]="true" multipleDisplay="summary"
          [summaryLabel]="summary" [menuFit]="true" [options]="options" [value]="value"
          [active]="isFiltering(value)" (valueChange)="value = $event" />
        <cs-select label="Sin filtro" placeholder="Todos los tipos" [multiple]="true" multipleDisplay="summary"
          [menuFit]="true" [options]="options" [value]="[]" />
      </div>
    `,
  }),
};

/** Estados del resumen múltiple: una opción, varias, error y deshabilitado. */
export const MultipleSummaryStates: Story = {
  render: () => ({
    props: { options: unitTypes },
    template: `
      <div style="display: grid; gap: 12px; width: 220px;">
        <cs-select label="Una opción" placeholder="Todos los tipos" [multiple]="true" multipleDisplay="summary" [options]="options" [value]="['bus']" [active]="true" />
        <cs-select label="Varias" placeholder="Todos los tipos" [multiple]="true" multipleDisplay="summary" [options]="options" [value]="['bus', 'moto']" [active]="true" />
        <cs-select label="Error" placeholder="Todos los tipos" [multiple]="true" multipleDisplay="summary" [options]="options" [value]="['bus']" [invalid]="true" />
        <cs-select label="Deshabilitado" placeholder="Todos los tipos" [multiple]="true" multipleDisplay="summary" [options]="options" [value]="['bus']" [disabled]="true" />
      </div>
    `,
  }),
};
