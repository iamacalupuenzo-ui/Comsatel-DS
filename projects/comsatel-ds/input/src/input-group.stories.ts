import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputGroup } from './input-group';
import { InputGroupAddon } from './input-group-addon';
import { InputGroupInput } from './input-group-input';
import { InputGroupClear } from './input-group-clear';
import { InputGroupText } from './input-group-text';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { InputDropdown } from '../../src/lib/dropdown/input-dropdown';
import { Button } from '@iamacalupuenzo-ui/comsatel-ds/button';

// InputGroup siempre se usa compuesto con cs-input-group-addon,
// cs-input-group-input y, opcionalmente, cs-input-group-text o
// cs-input-dropdown embebido — nunca solo. Cada story arma una de las
// composiciones reales documentadas en la página de Input.
const meta: Meta<InputGroup> = {
  title: 'Componentes/Input/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [InputGroupAddon, InputGroupInput, InputGroupClear, InputGroupText, Icon, InputDropdown, Button] })],
  render: () => ({
    template: `
      <cs-input-group>
        <cs-input-group-addon><cs-icon name="mail" [size]="16"></cs-icon></cs-input-group-addon>
        <cs-input-group-input aria-label="Email address" placeholder="Enter your email"></cs-input-group-input>
      </cs-input-group>
    `,
  }),
};
export default meta;
type Story = StoryObj<InputGroup>;

export const LeadingIcon: Story = {};

export const TrailingIcon: Story = {
  render: () => ({
    template: `
      <cs-input-group>
        <cs-input-group-input type="email" aria-label="Email address" placeholder="you@example.com"></cs-input-group-input>
        <cs-input-group-addon align="inline-end"><cs-icon name="mail" [size]="16"></cs-icon></cs-input-group-addon>
      </cs-input-group>
    `,
  }),
};
export const LeadingText: Story = {
  render: () => ({
    template: `
      <cs-input-group>
        <cs-input-group-addon><cs-input-group-text>https://</cs-input-group-text></cs-input-group-addon>
        <cs-input-group-input aria-label="Website" placeholder="your-domain.com"></cs-input-group-input>
      </cs-input-group>
    `,
  }),
};
export const TrailingText: Story = {
  render: () => ({
    template: `
      <cs-input-group>
        <cs-input-group-addon><cs-input-group-text>USD</cs-input-group-text></cs-input-group-addon>
        <cs-input-group-input type="number" aria-label="Amount" placeholder="0.00"></cs-input-group-input>
      </cs-input-group>
    `,
  }),
};

export const LeadingDropdown: Story = {
  render: () => ({
    template: `
      <cs-input-group>
        <cs-input-group-addon [divider]="true">
          <cs-input-dropdown aria-label="Código de país" [options]="[{ label: '+33 — Francia', triggerLabel: '+33', countryFlag: 'fr', value: 'fr' }, { label: '+44 — Reino Unido', triggerLabel: '+44', countryFlag: 'gb', value: 'gb' }]" value="fr" [embedded]="true"></cs-input-dropdown>
        </cs-input-group-addon>
        <cs-input-group-input aria-label="Phone number" placeholder="Phone number"></cs-input-group-input>
      </cs-input-group>
    `,
  }),
};

export const TrailingDropdown: Story = {
  render: () => ({
    template: `
      <cs-input-group>
        <cs-input-group-addon><cs-input-group-text>$</cs-input-group-text></cs-input-group-addon>
        <cs-input-group-input aria-label="Amount" placeholder="0.00"></cs-input-group-input>
        <cs-input-group-addon align="inline-end" [divider]="true">
          <cs-input-dropdown aria-label="Moneda" [options]="[{ label: 'USD — Dólar estadounidense', triggerLabel: 'USD', leadingText: '$', value: 'usd' }, { label: 'PEN — Sol peruano', triggerLabel: 'PEN', leadingText: 'S/', value: 'pen' }]" value="usd" [embedded]="true"></cs-input-dropdown>
        </cs-input-group-addon>
      </cs-input-group>
    `,
  }),
};

export const WithTrailingButton: Story = {
  render: () => ({
    template: `
      <cs-input-group>
        <cs-input-group-input aria-label="Invite link" placeholder="Enter invite link"></cs-input-group-input>
        <cs-input-group-addon align="inline-end" [compact]="true"><cs-button size="xs" variant="secondary">Copiar</cs-button></cs-input-group-addon>
      </cs-input-group>
    `,
  }),
};

export const AppliedFilterAndClear: Story = {
  render: () => ({ props: { value: 'VHC-001' }, template: `<div style="width:280px"><cs-input-group [active]="!!value"><cs-input-group-addon><cs-icon name="search" [size]="16" aria-hidden="true" /></cs-input-group-addon><cs-input-group-input aria-label="Buscar unidades" [value]="value" (valueChange)="value = $event" /><cs-input-group-clear label="Limpiar búsqueda" /></cs-input-group></div>` }),
};
export const CalendarTrailingIcon: Story = {
  render: () => ({ template: `<div style="width:280px"><cs-input-group><cs-input-group-input aria-label="Fecha" [readonly]="true" value="28/09/2026" /><cs-input-group-addon align="inline-end"><cs-icon name="calendar" [size]="16" aria-hidden="true" /></cs-input-group-addon></cs-input-group></div>` }),
};
export const ErrorWithMessage: Story = {
  render: () => ({ template: `<div style="width:280px"><cs-input-group><cs-input-group-input aria-label="Buscar" [invalid]="true" aria-errormessage="search-error" /></cs-input-group><p id="search-error">Ingresa un valor válido.</p></div>` }),
};
export const GroupStatesAndSizes: Story = {
  render: () => ({ template: `<div style="display:grid;gap:var(--layout-gap-md);width:280px"><cs-input-group><cs-input-group-input fieldSize="sm" aria-label="Vacío pequeño" placeholder="Vacío sm" /></cs-input-group><cs-input-group><cs-input-group-input fieldSize="md" aria-label="Con texto mediano" value="Con texto md" /></cs-input-group><cs-input-group><cs-input-group-input fieldSize="lg" aria-label="Requerido grande" [required]="true" placeholder="Requerido lg" /></cs-input-group><cs-input-group><cs-input-group-input aria-label="Deshabilitado" [disabled]="true" value="Deshabilitado" /></cs-input-group><cs-input-group><cs-input-group-input aria-label="Solo lectura" [readonly]="true" value="Solo lectura" /></cs-input-group></div>` }),
};
export const HoverAndFocus: Story = {
  parameters: { docs: { description: { story: 'Pasa el cursor sobre el primer grupo y usa Tab para comprobar el foco visible del segundo; ambos mantienen el mismo ancho.' } } },
  render: () => ({ template: `<div style="display:grid;gap:var(--layout-gap-md);width:280px"><cs-input-group><cs-input-group-input aria-label="Grupo hover" placeholder="Pasa el cursor" /></cs-input-group><cs-input-group><cs-input-group-input aria-label="Grupo foco" placeholder="Enfoca con Tab" /></cs-input-group></div>` }),
};
