import { Component, computed, signal } from '@angular/core';
import { Select, type SelectOption } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const TEAM_OPTIONS: SelectOption[] = [
  { label: 'Diseño', value: 'design' },
  { label: 'Ingeniería', value: 'eng' },
  { label: 'Producto', value: 'product' },
  { label: 'Ventas', value: 'sales' },
];

type Size = 'xs' | 'sm' | 'md' | 'lg';

/** Estado general del campo: vale igual para selección simple y múltiple. */
interface FieldState {
  value: string;
  label: string;
  when: string;
  props: string;
}

const FIELD_STATES: FieldState[] = [
  { value: 'default', label: 'Por defecto', when: 'Campo editable sin validación pendiente.', props: '—' },
  { value: 'active', label: 'Filtro aplicado', when: 'En barras de filtro, cuando la selección restringe el resultado. No lo uses en formularios.', props: '[active]="true"' },
  { value: 'invalid', label: 'Error', when: 'La selección no cumple una validación. Acompáñalo con un mensaje enlazado por aria-describedby.', props: '[invalid]="true" aria-describedby="id-del-mensaje"' },
  { value: 'readonly', label: 'Solo lectura', when: 'El valor debe verse, pero no cambiarse en este contexto.', props: '[readonly]="true"' },
  { value: 'disabled', label: 'Deshabilitado', when: 'El control no está disponible en el paso actual del flujo.', props: '[disabled]="true"' },
];

/** Cantidad de opciones marcadas en el playground de selección múltiple. */
interface CountOption {
  value: string;
  label: string;
  count: number | 'all';
  when: string;
}

const COUNT_OPTIONS: CountOption[] = [
  { value: '0', label: 'Ninguna', count: 0, when: 'Sin restricción: el placeholder comunica que se incluyen todas las opciones.' },
  { value: '1', label: 'Una', count: 1, when: 'Un solo criterio: resumen y chips muestran su nombre.' },
  { value: '2', label: 'Dos', count: 2, when: 'Pocos criterios: los chips caben completos; el resumen muestra el conteo.' },
  { value: '5', label: 'Cinco', count: 5, when: 'Varios criterios: los chips muestran dos y «+N»; en barras de filtro usa el resumen.' },
  { value: 'all', label: 'Todas', count: 'all', when: 'Todas marcadas equivale a «todos»: se muestra el placeholder y no se marca como aplicado.' },
];

const PLAYGROUND_CODE_HEAD = '<cs-select\n  label="Equipo"\n  placeholder="Selecciona un equipo…"\n  [options]="teamOptions"\n  [value]="value"\n  (valueChange)="value = $event"';

@Component({
  selector: 'app-select-page',
  imports: [Select, DemoShell],
  templateUrl: './select-page.html',
  styleUrl: './select-page.css',
})
export class SelectPage {
  protected readonly teamOptions = TEAM_OPTIONS;
  protected readonly longOptions: SelectOption[] = [
    { value: 'north', label: 'Operación logística de la zona norte con seguimiento continuo de unidades' },
    { value: 'south', label: 'Operación de distribución y mantenimiento de la zona sur' },
    { value: 'central', label: 'Operación central de monitoreo nocturno y atención de alertas' },
    { value: 'pending', label: 'Integración pendiente', disabled: true },
  ];
  protected readonly teamSummary = (count: number) => `${count} equipos seleccionados`;

  /* ── Playground general ─────────────────────────────────────────────── */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'toggle', label: 'Múltiple', key: 'multiple', default: false },
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['xs', 'sm', 'md', 'lg'], default: 'md' },
    { kind: 'select', label: 'Estado', key: 'state', options: FIELD_STATES.map(({ value, label }) => ({ value, label })), default: 'default' },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: false },
    { kind: 'toggle', label: 'Resumen en una línea', key: 'summary', default: false },
    { kind: 'toggle', label: 'Menú ajustado al campo', key: 'menuFit', default: false },
  ];
  protected readonly pgMultiple = signal(false);
  protected readonly pgSize = signal<Size>('md');
  protected readonly pgState = signal('default');
  protected readonly pgRequired = signal(false);
  protected readonly pgSummary = signal(false);
  protected readonly pgMenuFit = signal(false);
  /** Con valor desde el inicio: el estado aplicado, el error o solo lectura se ven sobre un valor real. */
  protected readonly pgSingleValue = signal('design');
  protected readonly pgMultipleValue = signal<string[]>(['design', 'eng']);
  protected readonly pgStateInfo = computed(() => FIELD_STATES.find((state) => state.value === this.pgState()) ?? FIELD_STATES[0]);

  protected onPlaygroundState(s: DemoState): void {
    if (s['multiple'] !== undefined) this.pgMultiple.set(!!s['multiple']);
    if (s['size']) this.pgSize.set(s['size'] as Size);
    if (s['state']) this.pgState.set(String(s['state']));
    if (s['required'] !== undefined) this.pgRequired.set(!!s['required']);
    if (s['summary'] !== undefined) this.pgSummary.set(!!s['summary']);
    if (s['menuFit'] !== undefined) this.pgMenuFit.set(!!s['menuFit']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = [];
    if (this.pgMultiple()) props.push('[multiple]="true"');
    if (this.pgMultiple() && this.pgSummary()) props.push('multipleDisplay="summary"');
    if (this.pgSize() !== 'md') props.push(`size="${this.pgSize()}"`);
    if (this.pgRequired()) props.push('[required]="true"');
    if (this.pgMenuFit()) props.push('[menuFit]="true"');
    const state = this.pgStateInfo();
    if (state.props !== '—') props.push(state.props);
    return `${PLAYGROUND_CODE_HEAD}${props.length ? '\n  ' + props.join('\n  ') : ''}\n/>`;
  });

  /* ── Playground de selección múltiple ───────────────────────────────── */
  protected readonly manyOptions: SelectOption[] = Array.from({ length: 12 }, (_, index) => ({ label: `Equipo ${index + 1}`, value: `team-${index + 1}` }));
  protected readonly multipleControls: ControlDef[] = [
    { kind: 'select', label: 'Visualización', key: 'display', options: [{ value: 'chips', label: 'Chips' }, { value: 'summary', label: 'Resumen' }], default: 'chips' },
    { kind: 'select', label: 'Marcadas', key: 'count', options: COUNT_OPTIONS.map(({ value, label }) => ({ value, label })), default: '2' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['xs', 'sm', 'md', 'lg'], default: 'md' },
  ];
  protected readonly mDisplay = signal<'chips' | 'summary'>('chips');
  protected readonly mCount = signal('2');
  protected readonly mSize = signal<Size>('md');
  protected readonly mValue = signal<string[]>(this.valuesFor('2'));
  protected readonly mCountInfo = computed(() => COUNT_OPTIONS.find((option) => option.value === this.mCount()) ?? COUNT_OPTIONS[0]);
  /** Selección parcial = filtro aplicado; ninguna o todas equivalen a «todos». */
  protected readonly mActive = computed(() => this.mValue().length > 0 && this.mValue().length < this.manyOptions.length);

  protected onMultipleState(s: DemoState): void {
    if (s['display']) this.mDisplay.set(s['display'] as 'chips' | 'summary');
    if (s['size']) this.mSize.set(s['size'] as Size);
    if (s['count'] && s['count'] !== this.mCount()) {
      this.mCount.set(String(s['count']));
      this.mValue.set(this.valuesFor(String(s['count'])));
    }
  }

  private valuesFor(count: string): string[] {
    const option = COUNT_OPTIONS.find((item) => item.value === count);
    const total = option?.count === 'all' ? 12 : (option?.count ?? 0);
    return Array.from({ length: total }, (_, index) => `team-${index + 1}`);
  }

  protected readonly mCode = computed(() => {
    const props = ['[multiple]="true"'];
    if (this.mDisplay() === 'summary') props.push('multipleDisplay="summary"', '[summaryLabel]="resumen"');
    if (this.mSize() !== 'md') props.push(`size="${this.mSize()}"`);
    props.push('[menuFit]="true"', '[active]="haySeleccionParcial"');
    return `<cs-select\n  label="Equipos"\n  placeholder="Todos los equipos"\n  [options]="equipos"\n  [value]="seleccion"\n  (valueChange)="seleccion = $event"\n  ${props.join('\n  ')}\n/>`;
  });

  /* ── Estados: un ejemplo por caja ───────────────────────────────────── */
  protected readonly stateValue = signal('design');
  protected readonly code = {
    empty: '<cs-select label="Equipo" placeholder="Selecciona un equipo…" [options]="teamOptions" />',
    filled: '<cs-select label="Equipo" [options]="teamOptions" value="design" />',
    active: '<cs-select label="Equipo" [options]="teamOptions" value="design" [active]="true" />',
    invalid: '<cs-select label="Equipo" [options]="teamOptions" [invalid]="true" aria-describedby="select-error" />\n<p id="select-error">Selecciona un equipo antes de continuar.</p>',
    required: '<cs-select label="Equipo" placeholder="Selecciona un equipo…" [options]="teamOptions" [required]="true" />',
    readonly: '<cs-select label="Equipo" [options]="teamOptions" value="design" [readonly]="true" />',
    disabled: '<cs-select label="Equipo" [options]="teamOptions" value="design" [disabled]="true" />',
    longSingle: '<cs-select label="Operación" [options]="operaciones" value="north" [showClear]="false" />',
    longChips: '<cs-select label="Operaciones" [multiple]="true" [options]="operaciones" [value]="[\'north\', \'south\', \'central\']" />',
    longSummary: '<cs-select label="Operaciones" [multiple]="true" multipleDisplay="summary" [options]="operaciones" [value]="[\'north\']" />',
  };
  protected readonly longSingle = signal<string | string[]>('north');
  protected readonly longChips = signal<string | string[]>(['north', 'south', 'central']);
  protected readonly longSummary = signal<string | string[]>(['north']);

  /* ── Lineamientos ───────────────────────────────────────────────────── */
  protected readonly guideLabelValue = signal('');
  protected readonly guideNoLabelValue = signal('');
  protected readonly guideMultipleValue = signal<string[]>(['design']);
  protected readonly guideNoMultipleValue = signal<string[]>([]);
  protected readonly guideFewOptionsValue = signal('');
}
