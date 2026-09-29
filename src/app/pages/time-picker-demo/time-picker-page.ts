import { Component, computed, signal } from '@angular/core';
import { TimePicker } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type Size = 'sm' | 'md' | 'lg';

const FIELD_STATES = [
  { value: 'default', label: 'Por defecto', when: 'Campo editable: haz clic para abrir las columnas de hora y minuto.', props: '—' },
  { value: 'active', label: 'Filtro aplicado', when: 'En filtros, cuando la hora restringe el resultado (por ejemplo, las posiciones de la Bitácora).', props: '[active]="true"' },
  { value: 'invalid', label: 'Error', when: 'La hora falta o no es válida; por ejemplo, «hasta» antes que «desde».', props: '[invalid]="true" errorMessage="…"' },
  { value: 'disabled', label: 'Deshabilitado', when: 'El campo no está disponible en el paso actual.', props: '[disabled]="true"' },
];

interface StateDemo { key: string; title: string; intro: string; attrs: string[] }

const STATES: StateDemo[] = [
  { key: 'empty', title: 'Vacío', intro: 'Sin hora: el campo muestra --:--.', attrs: [] },
  { key: 'filled', title: 'Con hora', intro: 'La hora elegida queda marcada en las dos columnas.', attrs: ['value="08:30"'] },
  { key: 'active', title: 'Filtro aplicado', intro: 'En filtros, con hora elegida.', attrs: ['value="08:30"', '[active]="true"'] },
  { key: 'step', title: 'Minutos de a 15', intro: 'Con minuteStep, la columna de minutos se reduce; útil cuando no hace falta más precisión.', attrs: ['[minuteStep]="15"'] },
  { key: 'invalid', title: 'Error', intro: 'La hora no es válida; el mensaje se enlaza con aria-errormessage.', attrs: ['[invalid]="true"', 'errorMessage="La hora final debe ser posterior a la inicial."'] },
  { key: 'required', title: 'Requerido', intro: 'El formulario no se puede enviar sin hora.', attrs: ['[required]="true"'] },
  { key: 'disabled', title: 'Deshabilitado', intro: 'El campo no está disponible en el paso actual.', attrs: ['[disabled]="true"'] },
];

@Component({
  selector: 'app-time-picker-page',
  imports: [TimePicker, DemoShell],
  templateUrl: './time-picker-page.html',
  styleUrl: './time-picker-page.css',
})
export class TimePickerPage {
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' },
    { kind: 'select', label: 'Estado', key: 'state', options: FIELD_STATES.map(({ value, label }) => ({ value, label })), default: 'default' },
    { kind: 'select', label: 'Intervalo de minutos', key: 'step', options: ['5', '10', '15', '30'], default: '5' },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: false },
  ];
  protected readonly pgSize = signal<Size>('md');
  protected readonly pgState = signal('default');
  protected readonly pgStep = signal(5);
  protected readonly pgRequired = signal(false);
  protected readonly pgValue = signal('08:30');
  protected readonly pgStateInfo = computed(() => FIELD_STATES.find((state) => state.value === this.pgState()) ?? FIELD_STATES[0]);

  protected onPlaygroundState(s: DemoState): void {
    if (s['size']) this.pgSize.set(s['size'] as Size);
    if (s['state']) this.pgState.set(String(s['state']));
    if (s['step']) this.pgStep.set(Number(s['step']));
    if (s['required'] !== undefined) this.pgRequired.set(!!s['required']);
  }

  protected readonly pgCode = computed(() => {
    const props = ['label="Hora desde"', '[value]="hora"', '(valueChange)="hora = $event"'];
    if (this.pgSize() !== 'md') props.push(`size="${this.pgSize()}"`);
    if (this.pgStep() !== 5) props.push(`[minuteStep]="${this.pgStep()}"`);
    if (this.pgRequired()) props.push('[required]="true"');
    const state = this.pgStateInfo();
    if (state.props !== '—') props.push(state.props);
    return `<cs-time-picker\n  ${props.join('\n  ')}\n/>`;
  });

  protected readonly states = STATES;
  protected readonly filledValue = signal('08:30');
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
    const attrs = ['label="Hora desde"', ...state.attrs, ...(size !== 'md' ? [`size="${size}"`] : [])];
    return `<cs-time-picker\n  ${attrs.join('\n  ')}\n/>`;
  }
}
