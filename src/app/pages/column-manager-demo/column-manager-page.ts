import { Component, computed, signal } from '@angular/core';
import { ColumnManager, type ColumnManagerItem } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const COLUMNS: ColumnManagerItem[] = [
  { key: 'date', label: 'Fecha de registro', visible: true },
  { key: 'financiera', label: 'Financiera', visible: true },
  { key: 'plate', label: 'Placa', visible: true },
  { key: 'engine', label: 'Motor', visible: false },
  { key: 'gps', label: 'GPS', visible: true },
  { key: 'status', label: 'Estado', visible: true },
];

@Component({
  selector: 'app-column-manager-page',
  imports: [ColumnManager, DemoShell],
  templateUrl: './column-manager-page.html',
  styleUrl: './column-manager-page.css',
})
export class ColumnManagerPage {
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: [{ value: 'default', label: 'Por defecto' }, { value: 'custom', label: 'Personalizado' }, { value: 'disabled', label: 'Deshabilitado' }], default: 'default' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' },
    { kind: 'select', label: 'Mínimo visible', key: 'min', options: ['1', '2', '3'], default: '1' },
    { kind: 'toggle', label: 'Deshabilitado', key: 'disabled', default: false },
  ];
  protected readonly size = signal<'sm' | 'md' | 'lg'>('md');
  protected readonly minVisible = signal(1);
  protected readonly disabled = signal(false);
  protected readonly pgState = signal('default');
  protected readonly states = [
    { key: 'default', title: 'Por defecto', intro: 'Todas las columnas principales visibles; una secundaria oculta.', props: '[columns]="columnas"' },
    { key: 'custom', title: 'Personalizado', intro: 'La persona ocultó una columna y la pantalla conserva esa selección.', props: '[columns]="columnasPersonalizadas"' },
    { key: 'disabled', title: 'Deshabilitado', intro: 'No se puede cambiar la vista durante una operación bloqueada.', props: '[disabled]="true"' },
  ];
  protected readonly sizeControls: ControlDef[] = [{ kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' }];
  protected readonly stateSizes = signal<Record<string, 'sm' | 'md' | 'lg'>>({});
  protected sizeOf(key: string): 'sm' | 'md' | 'lg' { return this.stateSizes()[key] ?? 'md'; }
  protected onSize(key: string, s: DemoState): void { if (s['size']) this.stateSizes.update((sizes) => ({ ...sizes, [key]: s['size'] as 'sm' | 'md' | 'lg' })); }
  protected stateColumns(key: string): ColumnManagerItem[] { return key === 'custom' ? COLUMNS.map((c) => ({ ...c, visible: c.key !== 'financiera' && c.visible })) : COLUMNS; }
  protected stateCode(key: string): string { return `<cs-column-manager [columns]="columnas" size="${this.sizeOf(key)}"${key === 'disabled' ? ' [disabled]="true"' : ''} />`; }
  protected readonly columns = signal<ColumnManagerItem[]>(COLUMNS);
  protected readonly visibleLabels = computed(() => this.columns().filter((c) => c.visible).map((c) => c.label).join(', '));

  protected onState(s: DemoState): void {
    if (s['state']) {
      this.pgState.set(String(s['state']));
      this.disabled.set(s['state'] === 'disabled');
      this.columns.set(this.stateColumns(String(s['state'])));
    }
    if (s['size']) this.size.set(s['size'] as 'sm' | 'md' | 'lg');
    if (s['min']) this.minVisible.set(Number(s['min']));
    if (s['disabled'] !== undefined) this.disabled.set(!!s['disabled']);
  }

  protected onVisibility(keys: string[]): void {
    this.columns.update((cols) => cols.map((c) => ({ ...c, visible: keys.includes(c.key) })));
  }
  protected onOrder(keys: string[]): void {
    this.columns.update((cols) => keys.map((k) => cols.find((c) => c.key === k)!).filter(Boolean));
  }

  protected readonly code = computed(() => {
    const props = ['[columns]="columnas"', '(visibilityChange)="mostrar($event)"', '(orderChange)="ordenar($event)"'];
    if (this.size() !== 'md') props.push(`size="${this.size()}"`);
    if (this.minVisible() !== 1) props.push(`[minVisible]="${this.minVisible()}"`);
    if (this.disabled()) props.push('[disabled]="true"');
    return `<cs-column-manager\n  ${props.join('\n  ')}\n/>`;
  });
}
