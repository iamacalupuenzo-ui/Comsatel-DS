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
  'leading-dropdown': 'Dropdown al inicio',
  'trailing-dropdown': 'Dropdown al final',
  'leading-text': 'Texto al inicio',
  payment: 'Input de pago',
};
const INPUT_TYPES = Object.keys(INPUT_TYPE_LABELS) as InputTypeKind[];
const INPUT_TYPE_OPTIONS: ControlOption[] = INPUT_TYPES.map((value) => ({
  value,
  label: INPUT_TYPE_LABELS[value],
}));

const PHONE_CODES: InputDropdownOption[] = [
  { value: '+33', label: '+33 Francia' },
  { value: '+44', label: '+44 Reino Unido' },
  { value: '+49', label: '+49 Alemania' },
  { value: '+34', label: '+34 España' },
  { value: '+55', label: '+55 Brasil' },
];
const CURRENCIES: InputDropdownOption[] = [
  { value: 'USD', label: 'USD — Dólar' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — Libra' },
  { value: 'PEN', label: 'PEN — Sol' },
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
        return `<cs-input-group>\n  <cs-input-group-addon><cs-input-dropdown [options]="phoneCodes" [value]="code"></cs-input-dropdown></cs-input-group-addon>\n  <cs-input-group-input placeholder="Número de teléfono"${attrs}></cs-input-group-input>\n</cs-input-group>`;
      case 'trailing-dropdown':
        return `<cs-input-group>\n  <cs-input-group-addon><cs-input-group-text>$</cs-input-group-text></cs-input-group-addon>\n  <cs-input-group-input placeholder="0.00"${attrs}></cs-input-group-input>\n  <cs-input-group-addon align="inline-end"><cs-input-dropdown [options]="currencies" [value]="currency"></cs-input-dropdown></cs-input-group-addon>\n</cs-input-group>`;
      case 'leading-text':
        return `<cs-input-group>\n  <cs-input-group-addon><cs-input-group-text>https://</cs-input-group-text></cs-input-group-addon>\n  <cs-input-group-input placeholder="tu-dominio.com"${attrs}></cs-input-group-input>\n</cs-input-group>`;
      case 'payment':
        return `<cs-input-group>\n  <cs-input-group-addon><cs-icon name="credit-card" [size]="16"></cs-icon></cs-input-group-addon>\n  <cs-input-group-input placeholder="Número de tarjeta"${attrs}></cs-input-group-input>\n</cs-input-group>`;
      default:
        return `<cs-input-group>\n  <cs-input-group-addon><cs-icon name="mail" [size]="16"></cs-icon></cs-input-group-addon>\n  <cs-input-group-input placeholder="Ingresa tu correo"${attrs}></cs-input-group-input>\n</cs-input-group>`;
    }
  });

  /* Password toggle demo */
  protected readonly showPassword = signal(false);
  protected togglePassword(): void {
    this.showPassword.update((v) => !v);
  }
}
