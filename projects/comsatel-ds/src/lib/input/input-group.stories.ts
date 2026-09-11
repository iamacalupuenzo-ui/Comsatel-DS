import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { InputGroup } from './input-group';
import { InputGroupAddon } from './input-group-addon';
import { InputGroupInput } from './input-group-input';
import { InputGroupText } from './input-group-text';
import { Icon } from '../icons/icon';
import { InputDropdown } from '../dropdown/input-dropdown';
import { Button } from '../button/button';

// InputGroup siempre se usa compuesto con cs-input-group-addon,
// cs-input-group-input y, opcionalmente, cs-input-group-text o
// cs-input-dropdown embebido — nunca solo. Cada story arma una de las
// composiciones reales documentadas en la página de Input.
const meta: Meta<InputGroup> = {
  title: 'Componentes/Input/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [InputGroupAddon, InputGroupInput, InputGroupText, Icon, InputDropdown, Button] })],
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

export const PasswordToggle: Story = {
  render: () => ({
    template: `
      <cs-input-group>
        <cs-input-group-addon><cs-icon name="lock" [size]="16"></cs-icon></cs-input-group-addon>
        <cs-input-group-input type="password" aria-label="Password" placeholder="Enter password"></cs-input-group-input>
        <cs-input-group-addon align="inline-end">
          <button type="button" aria-label="Show password"><cs-icon name="eye" [size]="16"></cs-icon></button>
        </cs-input-group-addon>
      </cs-input-group>
    `,
  }),
};
