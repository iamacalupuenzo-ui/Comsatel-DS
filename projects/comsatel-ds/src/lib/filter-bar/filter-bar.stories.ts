import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputDropdown } from '../dropdown/input-dropdown';
import type { InputDropdownOption } from '../dropdown/dropdown-types';
import { FilterBar } from './filter-bar';

const statusOptions: InputDropdownOption[] = [
  { label: 'Todos los estados', value: '' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Capturado', value: 'captured' },
];
const gpsOptions: InputDropdownOption[] = [
  { label: 'Todos', value: '' },
  { label: 'Con GPS', value: 'with' },
  { label: 'Sin señal', value: 'no-signal' },
];

const meta: Meta<FilterBar> = {
  title: 'Componentes/Filter bar',
  component: FilterBar,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [InputDropdown] })],
  args: {
    ariaLabel: 'Filtros de capturas',
    searchLabel: 'Buscar orden o unidad',
    searchPlaceholder: 'Buscar por orden o unidad',
    searchValue: '',
    hasMoreFilters: true,
    moreFiltersCount: 0,
    hasActiveFilters: false,
  },
  render: (args) => ({
    props: { ...args, statusOptions, gpsOptions },
    template: `
      <div style="padding-bottom: 180px">
        <cs-filter-bar
          [ariaLabel]="ariaLabel"
          [searchLabel]="searchLabel"
          [searchPlaceholder]="searchPlaceholder"
          [searchValue]="searchValue"
          [hasMoreFilters]="hasMoreFilters"
          [moreFiltersCount]="moreFiltersCount"
          [hasActiveFilters]="hasActiveFilters"
        >
          <cs-input-dropdown label="Estado" [options]="statusOptions" value="" [menuFit]="true" />
          <div moreFilters style="display: grid; gap: 12px">
            <cs-input-dropdown label="GPS" [options]="gpsOptions" value="" [fullWidth]="true" [menuFit]="true" />
          </div>
        </cs-filter-bar>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<FilterBar>;

export const Default: Story = {};
export const WithActiveFilters: Story = { args: { searchValue: 'BAB', moreFiltersCount: 1, hasActiveFilters: true } };
export const WithoutSearch: Story = { args: { searchLabel: '' } };
export const WithoutMoreFilters: Story = { args: { hasMoreFilters: false } };
