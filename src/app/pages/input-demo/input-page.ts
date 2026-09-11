import { Component, computed, signal } from '@angular/core';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Button,
  Icon,
  InputDropdown,
  type InputFieldSize,
  type InputDropdownOption,
} from 'comsatel-ds';
import { DemoShell, type ControlDef, type ControlOption, type DemoState } from '../../shared/docs/demo-shell';

const SIZES: InputFieldSize[] = ['sm', 'md', 'lg'];
type InputTypeKind = 'default' | 'leading-dropdown' | 'trailing-dropdown' | 'leading-text' | 'payment';
const INPUT_TYPE_LABELS: Record<InputTypeKind, string> = {
  default: 'Por defecto',
  'leading-dropdown': 'Selector de país',
  'trailing-dropdown': 'Selector de moneda',
  'leading-text': 'Texto al inicio',
  payment: 'Input de pago',
};
const INPUT_TYPES = Object.keys(INPUT_TYPE_LABELS) as InputTypeKind[];
const INPUT_TYPE_OPTIONS: ControlOption[] = INPUT_TYPES.map((value) => ({
  value,
  label: INPUT_TYPE_LABELS[value],
}));

const PHONE_CODES: InputDropdownOption[] = [
  { value: '+33', triggerLabel: '+33', label: '+33 — Francia', countryFlag: 'fr' },
  { value: '+44', triggerLabel: '+44', label: '+44 — Reino Unido', countryFlag: 'gb' },
  { value: '+49', triggerLabel: '+49', label: '+49 — Alemania', countryFlag: 'de' },
  { value: '+39', triggerLabel: '+39', label: '+39 — Italia', countryFlag: 'it' },
  { value: '+34', triggerLabel: '+34', label: '+34 — España', countryFlag: 'es' },
  { value: '+55', triggerLabel: '+55', label: '+55 — Brasil', countryFlag: 'br' },
  { value: '+81', triggerLabel: '+81', label: '+81 — Japón', countryFlag: 'jp' },
];
const CURRENCIES: InputDropdownOption[] = [
  { value: 'USD', triggerLabel: 'USD', label: 'USD — Dólar estadounidense', leadingText: '$' },
  { value: 'EUR', triggerLabel: 'EUR', label: 'EUR — Euro', leadingText: '€' },
  { value: 'GBP', triggerLabel: 'GBP', label: 'GBP — Libra esterlina', leadingText: '£' },
  { value: 'PEN', triggerLabel: 'PEN', label: 'PEN — Sol peruano', leadingText: 'S/' },
];

@Component({
  selector: 'app-input-page',
  imports: [Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, Button, Icon, InputDropdown, DemoShell],
  templateUrl: './input-page.html',
  styleUrl: './input-page.css',
})
export class InputPage {
  protected readonly sizes = SIZES;
  protected readonly inputTypeLabels = INPUT_TYPE_LABELS;
  protected readonly phoneCodes = PHONE_CODES;
  protected readonly currencies = CURRENCIES;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
    { kind: 'select', label: 'Tipo', key: 'inputType', options: INPUT_TYPE_OPTIONS, default: 'default' },
    { kind: 'toggle', label: 'Deshabilitado', key: 'disabled', default: false },
    { kind: 'toggle', label: 'Inválido', key: 'invalid', default: false },
  ];

  protected readonly pgSize = signal<InputFieldSize>('md');
  protected readonly pgType = signal<InputTypeKind>('default');
  protected readonly pgDisabled = signal(false);
  protected readonly pgInvalid = signal(false);
  protected readonly pgPhoneCode = signal('+33');
  protected readonly pgCurrency = signal('USD');

  protected onPlaygroundState(s: DemoState): void {
    if (s['size']) this.pgSize.set(s['size'] as InputFieldSize);
    if (s['inputType']) this.pgType.set(s['inputType'] as InputTypeKind);
    if (s['disabled'] !== undefined) this.pgDisabled.set(!!s['disabled']);
    if (s['invalid'] !== undefined) this.pgInvalid.set(!!s['invalid']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = [];
    if (this.pgSize() !== 'md') props.push(`fieldSize="${this.pgSize()}"`);
    if (this.pgDisabled()) props.push(`[disabled]="true"`);
    if (this.pgInvalid()) props.push(`[invalid]="true"`);
    const attrs = props.length ? ' ' + props.join(' ') : '';
    switch (this.pgType()) {
      case 'leading-dropdown':
        return `<cs-input-group>\n  <cs-input-group-addon [divider]="true"><cs-input-dropdown [options]="phoneCodes" [value]="code" [embedded]="true"></cs-input-dropdown></cs-input-group-addon>\n  <cs-input-group-input aria-label="Phone number" placeholder="Phone number"${attrs}></cs-input-group-input>\n</cs-input-group>`;
      case 'trailing-dropdown':
        return `<cs-input-group>\n  <cs-input-group-addon><cs-input-group-text>$</cs-input-group-text></cs-input-group-addon>\n  <cs-input-group-input aria-label="Amount" placeholder="0.00"${attrs}></cs-input-group-input>\n  <cs-input-group-addon align="inline-end" [divider]="true"><cs-input-dropdown [options]="currencies" [value]="currency" [embedded]="true"></cs-input-dropdown></cs-input-group-addon>\n</cs-input-group>`;
      case 'leading-text':
        return `<cs-input-group>\n  <cs-input-group-addon><cs-input-group-text>https://</cs-input-group-text></cs-input-group-addon>\n  <cs-input-group-input aria-label="Website" placeholder="your-domain.com"${attrs}></cs-input-group-input>\n</cs-input-group>`;
      case 'payment':
        return `<cs-input-group>\n  <cs-input-group-addon><cs-icon name="credit-card" [size]="16"></cs-icon></cs-input-group-addon>\n  <cs-input-group-input aria-label="Card number" placeholder="Card number"${attrs}></cs-input-group-input>\n</cs-input-group>`;
      default:
        return `<cs-input-group>\n  <cs-input-group-addon><cs-icon name="mail" [size]="16"></cs-icon></cs-input-group-addon>\n  <cs-input-group-input aria-label="Email address" placeholder="Enter your email"${attrs}></cs-input-group-input>\n</cs-input-group>`;
    }
  });

  /* Password toggle demo */
  protected readonly showPassword = signal(false);
  protected togglePassword(): void {
    this.showPassword.update((v) => !v);
  }

  /* Password toggle in the usage guideline stays isolated from the Playground. */
  protected readonly guidelineShowPassword = signal(false);
  protected toggleGuidelinePassword(): void {
    this.guidelineShowPassword.update((v) => !v);
  }
}
