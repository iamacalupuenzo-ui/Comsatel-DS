import type { Meta, StoryObj } from '@storybook/angular';
import { InputDropdown } from './input-dropdown';

const OPTIONS = [
  { label: 'Peru', value: 'pe' },
  { label: 'Colombia', value: 'co' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Mexico', value: 'mx' },
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
    label: 'Country',
    placeholder: 'Select a country',
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

export const SecondaryBounded: Story = {
  args: {
    label: 'Ubicación', surface: 'secondary', fullWidth: true, matchTriggerWidth: true,
    value: 'long', options: [
      { label: 'Todas', value: 'all' },
      { label: 'Unidades sin ubicación durante los últimos treinta días', value: 'long' },
      { label: 'Integración pendiente', value: 'disabled', disabled: true },
    ],
  },
  render: args => ({ props: args, template: `
    <div style="width: min(100%, calc(var(--layout-size-lg) * 6));">
      <cs-input-dropdown [label]="label" [options]="options" [value]="value" (valueChange)="value = $event"
        [surface]="surface" [fullWidth]="fullWidth" [matchTriggerWidth]="matchTriggerWidth" />
    </div>`,
  }),
};

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

const FILTER_OPTIONS = [
  { label: 'Todos los estados', value: '' },
  { label: 'Pendiente', value: 'pendiente' },
  { label: 'Observado', value: 'observado' },
  { label: 'Unidades sin ubicación durante los últimos treinta días', value: 'sin-ubicacion' },
];

/** Filtro de barra: estado aplicado cuando el valor no es «todos», menú al menos tan ancho como el campo. */
export const AppliedFilter: Story = {
  render: () => ({
    props: { options: FILTER_OPTIONS, value: 'observado' },
    template: `
      <div style="display: grid; gap: 12px; width: 200px;">
        <cs-input-dropdown aria-label="Estado" [fullWidth]="true" [menuFit]="true" [options]="options"
          [value]="value" [active]="!!value" (valueChange)="value = $event" />
        <cs-input-dropdown aria-label="Estado sin filtro" [fullWidth]="true" [menuFit]="true" [options]="options" value="" />
      </div>
    `,
  }),
};

/** Menú ajustado: la opción larga crece hasta el borde visible y recién ahí parte el texto. */
export const MenuFitLongOption: Story = {
  render: () => ({
    props: { options: FILTER_OPTIONS },
    template: `<div style="width: 160px;"><cs-input-dropdown aria-label="Estado" [fullWidth]="true" [menuFit]="true" [options]="options" value="sin-ubicacion" [active]="true" /></div>`,
  }),
};

/** Etiqueta de estado junto al texto, en el campo y en la lista. */
export const WithTags: Story = {
  render: () => ({
    props: {
      options: [
        { label: 'GPS principal', value: 'p', tag: { label: 'Con señal', tone: 'success' } },
        { label: 'GPS de respaldo', value: 'r', tag: { label: 'Sin señal', tone: 'danger' } },
      ],
      value: 'p',
    },
    template: `<div style="width: 260px;"><cs-input-dropdown label="GPS" [fullWidth]="true" [menuFit]="true" [options]="options" [value]="value" (valueChange)="value = $event" /></div>`,
  }),
};

/** Todos los estados del campo, con el tamaño xs (24 px) para celdas de tabla. */
export const AllStates: Story = {
  render: () => ({
    props: { options: FILTER_OPTIONS },
    template: `
      <div style="display: grid; gap: 12px; width: 220px;">
        <cs-input-dropdown label="Vacío" placeholder="Selecciona" [fullWidth]="true" [options]="options" />
        <cs-input-dropdown label="Con valor" [fullWidth]="true" [options]="options" value="pendiente" />
        <cs-input-dropdown label="Aplicado" [fullWidth]="true" [options]="options" value="pendiente" [active]="true" />
        <cs-input-dropdown label="Error" [fullWidth]="true" [options]="options" value="pendiente" [invalid]="true" />
        <cs-input-dropdown label="Requerido" placeholder="Selecciona" [fullWidth]="true" [options]="options" [required]="true" />
        <cs-input-dropdown label="Solo lectura" [fullWidth]="true" [options]="options" value="pendiente" [readonly]="true" />
        <cs-input-dropdown label="Deshabilitado" [fullWidth]="true" [options]="options" value="pendiente" [disabled]="true" />
        <cs-input-dropdown size="xs" aria-label="Celda de tabla" [fullWidth]="true" [menuFit]="true" [options]="options" value="pendiente" />
      </div>
    `,
  }),
};
