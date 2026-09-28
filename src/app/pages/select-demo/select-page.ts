import { Component, computed, signal } from '@angular/core';
import { Select, type SelectOption } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const TEAM_OPTIONS: SelectOption[] = [
  { label: 'Diseño', value: 'design' },
  { label: 'Ingeniería', value: 'eng' },
  { label: 'Producto', value: 'product' },
  { label: 'Ventas', value: 'sales' },
];

@Component({
  selector: 'app-select-page',
  imports: [Select, DemoShell],
  templateUrl: './select-page.html',
  styleUrl: './select-page.css',
})
export class SelectPage {
  protected readonly longOptions: SelectOption[] = [
    { value: 'all', label: 'Todas' },
    { value: 'north', label: 'Operación logística de la zona norte con seguimiento continuo de unidades' },
    { value: 'south', label: 'Operación de distribución y mantenimiento de la zona sur' },
    { value: 'pending', label: 'Integración pendiente', disabled: true },
  ];
  protected readonly longSingle = signal<string | string[]>('north');
  protected readonly longMultiple = signal<string | string[]>(['north', 'south']);
  protected readonly teamOptions = TEAM_OPTIONS;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'toggle', label: 'Múltiple', key: 'multiple', default: false },
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['xs', 'sm', 'md', 'lg'], default: 'md' },
    { kind: 'toggle', label: 'Label', key: 'showLabel', default: true },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: false },
    { kind: 'select', label: 'Estado', key: 'state', options: [{ value: 'default', label: 'Por defecto' }, { value: 'active', label: 'Filtro aplicado' }, { value: 'invalid', label: 'Error' }, { value: 'readonly', label: 'Solo lectura' }, { value: 'disabled', label: 'Deshabilitado' }], default: 'default' },
    { kind: 'toggle', label: 'Resumen en una línea', key: 'summary', default: false },
    { kind: 'toggle', label: 'Menú ajustado al campo', key: 'menuFit', default: false },
  ];
  protected readonly pgMultiple = signal(false);
  protected readonly pgSize = signal<'xs' | 'sm' | 'md' | 'lg'>('md');
  protected readonly pgShowLabel = signal(true);
  protected readonly pgRequired = signal(false);
  /** Un solo estado a la vez: se elige en el selector «Estado» del playground. */
  protected readonly pgState = signal('default');
  protected readonly pgDisabled = computed(() => this.pgState() === 'disabled');
  protected readonly pgReadonly = computed(() => this.pgState() === 'readonly');
  protected readonly pgInvalid = computed(() => this.pgState() === 'invalid');
  protected readonly pgSummary = signal(false);
  protected readonly pgActive = computed(() => this.pgState() === 'active');
  protected readonly pgMenuFit = signal(false);
  protected readonly pgSingleValue = signal('');
  protected readonly pgMultipleValue = signal<string[]>([]);
  protected readonly stateMultipleValue = signal<string[]>(['design', 'eng']);
  protected readonly guideLabelValue = signal('');
  protected readonly guideNoLabelValue = signal('');
  protected readonly guideMultipleValue = signal<string[]>(['design']);
  protected readonly guideNoMultipleValue = signal<string[]>([]);
  protected readonly guideFewOptionsValue = signal('');

  /* Filtro de barra */
  protected readonly unitTypeOptions: SelectOption[] = [
    { label: 'Automóvil', value: 'car' },
    { label: 'Camión', value: 'truck' },
    { label: 'Bus', value: 'bus' },
    { label: 'Motocicleta', value: 'moto' },
  ];
  protected readonly filterValue = signal<string[]>(['car', 'truck']);
  /** Ninguna o todas las opciones equivalen a «todos»: el filtro no se ve aplicado. */
  protected readonly filterActive = computed(() => this.filterValue().length > 0 && this.filterValue().length < this.unitTypeOptions.length);
  protected readonly unitTypeSummary = (count: number) => `${count} tipos seleccionados`;

  protected onPlaygroundState(s: DemoState): void {
    if (s['multiple'] !== undefined) {
      this.pgMultiple.set(!!s['multiple']);
    }
    if (s['size']) this.pgSize.set(s['size'] as 'xs' | 'sm' | 'md' | 'lg');
    if (s['showLabel'] !== undefined) this.pgShowLabel.set(!!s['showLabel']);
    if (s['required'] !== undefined) this.pgRequired.set(!!s['required']);
    if (s['state']) this.pgState.set(String(s['state']));
    if (s['summary'] !== undefined) this.pgSummary.set(!!s['summary']);
    if (s['menuFit'] !== undefined) this.pgMenuFit.set(!!s['menuFit']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = [];
    if (this.pgMultiple()) props.push('[multiple]="true"');
    if (this.pgSize() !== 'md') props.push(`size="${this.pgSize()}"`);
    if (this.pgShowLabel()) props.push('label="Equipo"');
    if (this.pgRequired()) props.push('[required]="true"');
    if (this.pgDisabled()) props.push('[disabled]="true"');
    if (this.pgReadonly()) props.push('[readonly]="true"');
    if (this.pgInvalid()) props.push('[invalid]="true"');
    if (this.pgSummary()) props.push('multipleDisplay="summary"');
    if (this.pgActive()) props.push('[active]="true"');
    if (this.pgMenuFit()) props.push('[menuFit]="true"');
    return `<cs-select\n  placeholder="Selecciona un equipo…"\n  [options]="teamOptions"\n  [value]="value"\n  (valueChange)="value = $event"${props.length ? '\n  ' + props.join('\n  ') : ''}\n/>`;
  });
}
