import { Component, computed, signal } from '@angular/core';
import { DateRangePicker, TimePicker, type DateRangeValue } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type Size = 'sm' | 'md' | 'lg';

const FIELD_STATES = [
  { value: 'default', label: 'Por defecto', when: 'Campo editable: haz clic para abrir el calendario y elige el inicio y el fin.', props: '—' },
  { value: 'active', label: 'Filtro aplicado', when: 'En barras de filtro, cuando el rango restringe el resultado.', props: '[active]="true"' },
  { value: 'invalid', label: 'Error', when: 'El rango falta o no es válido. Siempre con un mensaje que explique cómo resolverlo.', props: '[invalid]="true" errorMessage="…"' },
  { value: 'disabled', label: 'Deshabilitado', when: 'El filtro no está disponible en el paso actual.', props: '[disabled]="true"' },
];

interface StateDemo { key: string; title: string; intro: string; attrs: string[] }

const STATES: StateDemo[] = [
  { key: 'empty', title: 'Vacío', intro: 'Sin rango. El placeholder dice qué incluye el filtro, por ejemplo «Todas las fechas».', attrs: ['placeholder="Todas las fechas"'] },
  { key: 'start', title: 'Inicio elegido', intro: 'Tras el primer clic, el campo muestra «Desde …» mientras se elige el segundo día.', attrs: ['[value]="{ from: \'2026-09-21\', to: \'\' }"'] },
  { key: 'range', title: 'Con rango', intro: 'Con inicio y fin, el campo muestra las dos fechas. El calendario resalta el rango.', attrs: ['[value]="{ from: \'2026-09-21\', to: \'2026-09-28\' }"'] },
  { key: 'active', title: 'Filtro aplicado', intro: 'En barras de filtro, con rango elegido.', attrs: ['[value]="rango"', '[active]="true"'] },
  { key: 'invalid', title: 'Error', intro: 'El rango falta o no es válido; el mensaje se enlaza con aria-errormessage.', attrs: ['[invalid]="true"', 'errorMessage="Elige un rango de hasta 31 días."'] },
  { key: 'required', title: 'Requerido', intro: 'El formulario no se puede enviar sin rango. El asterisco aparece junto al label.', attrs: ['[required]="true"'] },
  { key: 'disabled', title: 'Deshabilitado', intro: 'El filtro no está disponible en el paso actual.', attrs: ['[disabled]="true"'] },
];

@Component({
  selector: 'app-date-range-picker-page',
  imports: [DateRangePicker, TimePicker, DemoShell],
  templateUrl: './date-range-picker-page.html',
  styleUrl: './date-range-picker-page.css',
})
export class DateRangePickerPage {
  /* ── Playground ─────────────────────────────────────────────────────── */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' },
    { kind: 'select', label: 'Estado', key: 'state', options: FIELD_STATES.map(({ value, label }) => ({ value, label })), default: 'default' },
    { kind: 'select', label: 'Inicio de semana', key: 'week', options: [{ value: '1', label: 'Lunes' }, { value: '0', label: 'Domingo' }], default: '1' },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: false },
  ];
  protected readonly pgSize = signal<Size>('md');
  protected readonly pgState = signal('default');
  protected readonly pgWeek = signal<0 | 1>(1);
  protected readonly pgRequired = signal(false);
  protected readonly pgValue = signal<DateRangeValue>({ from: '2026-09-21', to: '2026-09-28' });
  protected readonly pgStateInfo = computed(() => FIELD_STATES.find((state) => state.value === this.pgState()) ?? FIELD_STATES[0]);

  protected onPlaygroundState(s: DemoState): void {
    if (s['size']) this.pgSize.set(s['size'] as Size);
    if (s['state']) this.pgState.set(String(s['state']));
    if (s['week']) this.pgWeek.set(s['week'] === '0' ? 0 : 1);
    if (s['required'] !== undefined) this.pgRequired.set(!!s['required']);
  }

  protected readonly pgCode = computed(() => {
    const props = ['label="Fecha de registro"', 'placeholder="Todas las fechas"', '[value]="rango"', '(valueChange)="rango = $event"'];
    if (this.pgSize() !== 'md') props.push(`size="${this.pgSize()}"`);
    if (this.pgWeek() === 0) props.push('[weekStartDay]="0"');
    if (this.pgRequired()) props.push('[required]="true"');
    const state = this.pgStateInfo();
    if (state.props !== '—') props.push(state.props);
    return `<cs-date-range-picker\n  ${props.join('\n  ')}\n/>`;
  });

  /* ── Estados ────────────────────────────────────────────────────────── */
  protected readonly states = STATES;
  protected readonly rangeValue = signal<DateRangeValue>({ from: '2026-09-21', to: '2026-09-28' });
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
    const attrs = ['label="Fecha de registro"', ...state.attrs, ...(size !== 'md' ? [`size="${size}"`] : [])];
    return `<cs-date-range-picker\n  ${attrs.join('\n  ')}\n/>`;
  }

  /* ── Caso de uso: rango con horas en un panel angosto ──────────────── */
  protected readonly panelRange = signal<DateRangeValue>({ from: '', to: '' });
  protected readonly panelFrom = signal('');
  protected readonly panelTo = signal('');
  protected readonly panelCode = '<cs-date-range-picker\n  label="Rango de fechas"\n  placeholder="Todas las fechas"\n  [value]="rango"\n  (valueChange)="rango = $event"\n/>\n<div class="fila">\n  <cs-time-picker label="Hora desde" [active]="true" [value]="desde" (valueChange)="desde = $event" />\n  <cs-time-picker label="Hora hasta" [active]="true" [value]="hasta" (valueChange)="hasta = $event" />\n</div>';
}
