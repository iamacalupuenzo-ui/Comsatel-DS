import { Component, computed, signal } from '@angular/core';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  PasswordInput,
  Button,
  Icon,
  InputDropdown,
  type InputFieldSize,
  type InputDropdownOption,
} from '@iamacalupuenzo-ui/comsatel-ds';
// Prueba del punto de entrada /input: InputGroupClear desde su subpath.
import { InputGroupClear } from '@iamacalupuenzo-ui/comsatel-ds/input';
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
  imports: [Input, InputGroup, InputGroupAddon, InputGroupClear, InputGroupInput, InputGroupText, PasswordInput, Button, Icon, InputDropdown, DemoShell],
  templateUrl: './input-page.html',
  styleUrl: './input-page.css',
})
export class InputPage {
  protected readonly searchValue = signal('VHC-001');
  protected readonly sizes = SIZES;
  protected readonly inputTypeLabels = INPUT_TYPE_LABELS;
  protected readonly phoneCodes = PHONE_CODES;
  protected readonly currencies = CURRENCIES;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
    { kind: 'select', label: 'Tipo', key: 'inputType', options: INPUT_TYPE_OPTIONS, default: 'default' },
    { kind: 'select', label: 'Estado', key: 'state', options: [{ value: 'default', label: 'Por defecto' }, { value: 'active', label: 'Filtro aplicado' }, { value: 'invalid', label: 'Error' }, { value: 'readonly', label: 'Solo lectura' }, { value: 'disabled', label: 'Deshabilitado' }], default: 'default' },
    { kind: 'toggle', label: 'Botón limpiar', key: 'clear', default: false },
  ];

  protected readonly pgSize = signal<InputFieldSize>('md');
  protected readonly pgType = signal<InputTypeKind>('default');
  /** Un solo estado a la vez: se elige en el selector «Estado» del playground. */
  protected readonly pgState = signal('default');
  protected readonly pgDisabled = computed(() => this.pgState() === 'disabled');
  protected readonly pgInvalid = computed(() => this.pgState() === 'invalid');
  protected readonly pgReadonly = computed(() => this.pgState() === 'readonly');
  protected readonly pgActive = computed(() => this.pgState() === 'active');
  protected readonly pgClear = signal(false);
  protected readonly pgPhoneCode = signal('+33');
  protected readonly pgCurrency = signal('USD');

  protected onPlaygroundState(s: DemoState): void {
    if (s['size']) this.pgSize.set(s['size'] as InputFieldSize);
    if (s['inputType']) this.pgType.set(s['inputType'] as InputTypeKind);
    if (s['state']) this.pgState.set(String(s['state']));
    if (s['clear'] !== undefined) this.pgClear.set(!!s['clear']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = [];
    if (this.pgSize() !== 'md') props.push(`fieldSize="${this.pgSize()}"`);
    if (this.pgDisabled()) props.push(`[disabled]="true"`);
    if (this.pgInvalid()) props.push(`[invalid]="true"`);
    if (this.pgReadonly()) props.push(`[readonly]="true"`);
    const attrs = props.length ? ' ' + props.join(' ') : '';
    const group = this.pgActive() ? '<cs-input-group [active]="true">' : '<cs-input-group>';
    const clear = this.pgClear() ? '\n  <cs-input-group-clear label="Limpiar campo"></cs-input-group-clear>' : '';
    switch (this.pgType()) {
      case 'leading-dropdown':
        return `${group}\n  <cs-input-group-addon [divider]="true"><cs-input-dropdown [options]="phoneCodes" [value]="code" [embedded]="true"></cs-input-dropdown></cs-input-group-addon>\n  <cs-input-group-input aria-label="Phone number" placeholder="Phone number"${attrs}></cs-input-group-input>${clear}\n</cs-input-group>`;
      case 'trailing-dropdown':
        return `${group}\n  <cs-input-group-addon><cs-input-group-text>$</cs-input-group-text></cs-input-group-addon>\n  <cs-input-group-input aria-label="Amount" placeholder="0.00"${attrs}></cs-input-group-input>\n  <cs-input-group-addon align="inline-end" [divider]="true"><cs-input-dropdown [options]="currencies" [value]="currency" [embedded]="true"></cs-input-dropdown></cs-input-group-addon>\n</cs-input-group>`;
      case 'leading-text':
        return `${group}\n  <cs-input-group-addon><cs-input-group-text>https://</cs-input-group-text></cs-input-group-addon>\n  <cs-input-group-input aria-label="Website" placeholder="your-domain.com"${attrs}></cs-input-group-input>${clear}\n</cs-input-group>`;
      case 'payment':
        return `${group}\n  <cs-input-group-addon><cs-icon name="credit-card" [size]="16"></cs-icon></cs-input-group-addon>\n  <cs-input-group-input aria-label="Card number" placeholder="Card number"${attrs}></cs-input-group-input>${clear}\n</cs-input-group>`;
      default:
        return `${group}\n  <cs-input-group-addon><cs-icon name="mail" [size]="16"></cs-icon></cs-input-group-addon>\n  <cs-input-group-input aria-label="Email address" placeholder="Enter your email"${attrs}></cs-input-group-input>${clear}\n</cs-input-group>`;
    }
  });


  /* Estados: una caja por estado, cada una con su selector de tamaño. */
  protected readonly stateSizeControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
  ];
  protected readonly inputStates: InputStateDemo[] = INPUT_STATES;
  private readonly stateSizes = signal<Record<string, InputFieldSize>>({});
  protected stateSizeOf(key: string): InputFieldSize {
    return this.stateSizes()[key] ?? 'md';
  }
  protected onStateSize(key: string, s: DemoState): void {
    if (s['size']) this.stateSizes.update((sizes) => ({ ...sizes, [key]: s['size'] as InputFieldSize }));
  }
  protected stateCode(state: InputStateDemo): string {
    const size = this.stateSizeOf(state.key);
    const attrs = [...(size !== 'md' ? [`fieldSize="${size}"`] : []), ...state.attrs, `aria-label="${state.title}"`];
    return `<cs-input ${attrs.join(' ')}></cs-input>${state.after ?? ''}`;
  }
  protected caseCode(kind: 'search' | 'date'): string {
    const size = this.stateSizeOf(kind === 'search' ? 'case-search' : 'case-date');
    const fieldSize = size !== 'md' ? ` fieldSize="${size}"` : '';
    return kind === 'search'
      ? `<cs-input-group [active]="!!busqueda">
  <cs-input-group-addon><cs-icon name="search" [size]="16" aria-hidden="true" /></cs-input-group-addon>
  <cs-input-group-input${fieldSize} aria-label="Buscar unidades" placeholder="Buscar unidades" [value]="busqueda" (valueChange)="busqueda = $event" />
  <cs-input-group-clear label="Limpiar búsqueda" />
</cs-input-group>`
      : `<cs-input-group>
  <cs-input-group-input${fieldSize} aria-label="Fecha de registro" [readonly]="true" [value]="fecha" />
  <cs-input-group-addon align="inline-end"><cs-icon name="calendar" [size]="16" aria-hidden="true" /></cs-input-group-addon>
</cs-input-group>`;
  }
}

interface InputStateDemo {
  key: string;
  title: string;
  intro: string;
  placeholder?: string;
  value?: string;
  /** Atributos que producen el estado, tal como se muestran en el código. */
  attrs: string[];
  after?: string;
}

const INPUT_STATES: InputStateDemo[] = [
  { key: 'default', title: 'Por defecto', intro: 'Campo editable, sin validación pendiente. Haz clic para ver el foco.', placeholder: 'nombre@empresa.com', attrs: ['placeholder="nombre@empresa.com"'] },
  { key: 'required', title: 'Requerido', intro: 'El formulario no se puede enviar sin este valor. Acompáñalo con el asterisco del label.', placeholder: 'nombre@empresa.com', attrs: ['[required]="true"', 'placeholder="nombre@empresa.com"'] },
  { key: 'invalid', title: 'Error', intro: 'El valor no cumple una validación. Siempre con un mensaje que explique cómo resolverlo.', value: 'enzo@', attrs: ['[invalid]="true"', 'aria-errormessage="email-error"', 'value="enzo@"'], after: '\n<p id="email-error">Ingresa un correo válido.</p>' },
  { key: 'active', title: 'Filtro aplicado', intro: 'Solo en barras de filtro, cuando el texto restringe el resultado.', value: 'VHC-001', attrs: ['[active]="true"', 'value="VHC-001"'] },
  { key: 'readonly', title: 'Solo lectura', intro: 'El valor se muestra y se puede copiar, pero no editar; por ejemplo, en un detalle ya confirmado.', value: 'enzo@empresa.com', attrs: ['[readonly]="true"', 'value="enzo@empresa.com"'] },
  { key: 'disabled', title: 'Deshabilitado', intro: 'El campo no está disponible en el paso actual del flujo.', placeholder: 'nombre@empresa.com', attrs: ['[disabled]="true"', 'placeholder="nombre@empresa.com"'] },
];
