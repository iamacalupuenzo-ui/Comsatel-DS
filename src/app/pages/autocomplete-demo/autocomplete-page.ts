import { Component, computed, signal } from '@angular/core';
import { Autocomplete, type AutocompleteOption } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type Size = 'sm' | 'md' | 'lg';

const UNITS: AutocompleteOption[] = [
  { value: 'CTQ527', label: 'CTQ527', description: 'LJO18S12020619', icon: 'car', searchText: 'CTQ527 LJO18S12020619 45879123' },
  { value: 'U1P812', label: 'U1P812', description: 'HFC4DB21D1S4101086', icon: 'car', searchText: 'U1P812 HFC4DB21D1S4101086 70214589' },
  { value: 'CYA089', label: 'CYA089', description: 'BHE15EFZSCGA0626999', icon: 'car', searchText: 'CYA089 BHE15EFZSCGA0626999 41236987' },
  { value: 'CUZ664', label: 'CUZ664', description: '4A91KDC4645', icon: 'car', searchText: 'CUZ664 4A91KDC4645 10254789' },
  { value: 'MTR-3001', label: 'MTR-3001', description: 'ISB6.5-473', icon: 'truck', searchText: 'MTR-3001 ISB6.5-473' },
  { value: 'MTR-3002', label: 'MTR-3002', description: 'ISB1.0-333', icon: 'truck', searchText: 'MTR-3002 ISB1.0-333' },
  { value: 'MTR-3004', label: 'MTR-3004', description: 'ISB9.8-944', icon: 'bus', searchText: 'MTR-3004 ISB9.8-944' },
  { value: 'MTR-3005', label: 'MTR-3005', description: 'ISB9.8-854', icon: 'bike', searchText: 'MTR-3005 ISB9.8-854' },
];

const COMMANDS: AutocompleteOption[] = [
  { value: 'reset', label: 'Reiniciar equipo', description: 'Reinicia el GPS' },
  { value: 'locate', label: 'Solicitar posición', description: 'Pide una posición inmediata' },
  { value: 'block', label: 'Bloquear motor', description: 'Corta el encendido al detenerse' },
  { value: 'unblock', label: 'Desbloquear motor', description: 'Restituye el encendido' },
  { value: 'siren', label: 'Activar sirena', description: 'Hace sonar la alarma' },
];

interface StateDemo {
  key: string;
  title: string;
  intro: string;
  /** Atributos que producen el estado, tal como se muestran en el código. */
  attrs: string[];
}

const FIELD_STATES: { value: string; label: string; when: string; props: string }[] = [
  { value: 'default', label: 'Por defecto', when: 'Campo editable. Escribe al menos el mínimo de caracteres para abrir la lista.', props: '—' },
  { value: 'active', label: 'Filtro aplicado', when: 'En barras de filtro, cuando el texto escrito restringe el resultado.', props: '[active]="true"' },
  { value: 'invalid', label: 'Error', when: 'La selección falta o no es válida. Siempre con un mensaje que explique cómo resolverlo.', props: '[invalid]="true" errorMessage="…"' },
  { value: 'readonly', label: 'Solo lectura', when: 'El valor se muestra, pero no se puede buscar ni limpiar.', props: '[readonly]="true"' },
  { value: 'disabled', label: 'Deshabilitado', when: 'El campo no está disponible en el paso actual del flujo.', props: '[disabled]="true"' },
];

const STATES: StateDemo[] = [
  { key: 'empty', title: 'Vacío', intro: 'Aún no se buscó nada. La lista se abre al escribir el mínimo de caracteres, no al enfocar el campo.', attrs: ['placeholder="Escribe 3 caracteres para buscar"', '[minChars]="3"'] },
  { key: 'results', title: 'Con resultados', intro: 'Escribe «MTR» para ver las coincidencias. Flechas para recorrer, Enter para elegir y Escape para cerrar.', attrs: ['[minChars]="2"'] },
  { key: 'no-results', title: 'Sin resultados', intro: 'Escribe «zzz»: ninguna opción coincide y se muestra el texto vacío, anunciado como estado.', attrs: ['emptyText="No encontramos una unidad con ese código."'] },
  { key: 'filled', title: 'Con valor', intro: 'Hay una opción elegida y el campo muestra su label. Si escribes de nuevo, la selección se borra.', attrs: ['[value]="\'CTQ527\'"'] },
  { key: 'active', title: 'Filtro aplicado', intro: 'En barras de filtro, con texto escrito: el campo se ve como filtro aplicado.', attrs: ['[value]="\'MTR-3001\'"', '[active]="true"'] },
  { key: 'invalid', title: 'Error', intro: 'La selección falta o no es válida. El mensaje se enlaza con aria-errormessage.', attrs: ['[invalid]="true"', 'errorMessage="Elige una unidad de la lista."'] },
  { key: 'required', title: 'Requerido', intro: 'El formulario no se puede enviar sin elegir una opción. El asterisco aparece junto al label.', attrs: ['[required]="true"'] },
  { key: 'readonly', title: 'Solo lectura', intro: 'El valor se muestra sin permitir buscar ni limpiar; por ejemplo, en un detalle ya confirmado.', attrs: ['[value]="\'CTQ527\'"', '[readonly]="true"'] },
  { key: 'disabled', title: 'Deshabilitado', intro: 'El campo no está disponible en el paso actual del flujo.', attrs: ['[disabled]="true"'] },
];

@Component({
  selector: 'app-autocomplete-page',
  imports: [Autocomplete, DemoShell],
  templateUrl: './autocomplete-page.html',
  styleUrl: './autocomplete-page.css',
})
export class AutocompletePage {
  protected readonly units = UNITS;
  protected readonly commands = COMMANDS;

  /* ── Playground ─────────────────────────────────────────────────────── */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' },
    { kind: 'select', label: 'Estado', key: 'state', options: FIELD_STATES.map(({ value, label }) => ({ value, label })), default: 'default' },
    { kind: 'select', label: 'Caracteres mínimos', key: 'minChars', options: ['1', '2', '3'], default: '2' },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: false },
    { kind: 'toggle', label: 'Botón limpiar', key: 'clearable', default: true },
  ];
  protected readonly pgSize = signal<Size>('md');
  protected readonly pgState = signal('default');
  protected readonly pgMinChars = signal(2);
  protected readonly pgRequired = signal(false);
  protected readonly pgClearable = signal(true);
  protected readonly pgValue = signal('');
  protected readonly pgStateInfo = computed(() => FIELD_STATES.find((state) => state.value === this.pgState()) ?? FIELD_STATES[0]);

  protected onPlaygroundState(s: DemoState): void {
    if (s['size']) this.pgSize.set(s['size'] as Size);
    if (s['state']) {
      this.pgState.set(String(s['state']));
      // Filtro aplicado y solo lectura se ven sobre un valor real.
      if ((s['state'] === 'active' || s['state'] === 'readonly') && !this.pgValue()) this.pgValue.set('CTQ527');
    }
    if (s['minChars']) this.pgMinChars.set(Number(s['minChars']));
    if (s['required'] !== undefined) this.pgRequired.set(!!s['required']);
    if (s['clearable'] !== undefined) this.pgClearable.set(!!s['clearable']);
  }

  protected readonly pgCode = computed(() => {
    const props = ['label="Código de unidad"', 'placeholder="Placa o motor"', '[options]="unidades"', '[value]="unidad"', '(valueChange)="unidad = $event"'];
    if (this.pgMinChars() !== 1) props.push(`[minChars]="${this.pgMinChars()}"`);
    if (this.pgSize() !== 'md') props.push(`size="${this.pgSize()}"`);
    if (this.pgRequired()) props.push('[required]="true"');
    if (!this.pgClearable()) props.push('[clearable]="false"');
    const state = this.pgStateInfo();
    if (state.props !== '—') props.push(state.props);
    return `<cs-autocomplete\n  ${props.join('\n  ')}\n/>`;
  });

  /* ── Estados: una caja por estado, cada una con su selector de tamaño ── */
  protected readonly states = STATES;
  protected readonly stateSizeControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' },
  ];
  private readonly stateSizes = signal<Record<string, Size>>({});
  protected sizeOf(key: string): Size {
    return this.stateSizes()[key] ?? 'md';
  }
  protected onStateSize(key: string, s: DemoState): void {
    if (s['size']) this.stateSizes.update((sizes) => ({ ...sizes, [key]: s['size'] as Size }));
  }
  protected stateCode(state: StateDemo): string {
    const size = this.sizeOf(state.key);
    const attrs = ['label="Código de unidad"', '[options]="unidades"', ...state.attrs, ...(size !== 'md' ? [`size="${size}"`] : [])];
    return `<cs-autocomplete\n  ${attrs.join('\n  ')}\n/>`;
  }

  /* ── Casos de uso ───────────────────────────────────────────────────── */
  protected readonly unitValue = signal('');
  protected readonly commandValue = signal('');
  protected readonly unitCaseCode = '<cs-autocomplete\n  label="Buscar unidad"\n  placeholder="Placa, motor o DNI"\n  [minChars]="2"\n  [options]="unidades"\n  [value]="unidad"\n  (valueChange)="unidad = $event"\n/>\n\n// Cada opción busca también por datos que no se muestran (DNI):\n{ value: \'CTQ527\', label: \'CTQ527\', description: \'LJO18S12020619\', icon: \'car\', searchText: \'CTQ527 LJO18S12020619 45879123\' }';
  protected readonly commandCaseCode = '<cs-autocomplete\n  label="Buscar comando"\n  placeholder="Por ejemplo, «res»"\n  leadingIcon="satellite"\n  [options]="comandos"\n  [value]="comando"\n  (valueChange)="comando = $event"\n/>';
}
