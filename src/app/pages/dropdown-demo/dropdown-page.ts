import { Component, computed, signal } from '@angular/core';
import {
  Dropdown,
  InputDropdown,
  type DropdownGroup,
  type DropdownItem,
  type DropdownPosition,
  type DropdownSize,
  type DropdownTrigger,
  type InputDropdownOption,
} from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const SIMPLE_GROUPS: DropdownGroup[] = [
  {
    items: [
      { label: 'Editar', value: 'edit', icon: 'pencil' },
      { label: 'Duplicar', value: 'duplicate', icon: 'copy' },
      { label: 'Descargar', value: 'download', icon: 'download', dividerAfter: true },
      { label: 'Eliminar', value: 'delete', icon: 'trash-2', variant: 'destructive' },
    ],
  },
];

const GROUPED_GROUPS: DropdownGroup[] = [
  {
    header: 'Cuenta',
    items: [
      { label: 'Perfil', value: 'profile', icon: 'user' },
      { label: 'Configuración', value: 'settings', icon: 'settings' },
    ],
  },
  {
    header: 'Acciones',
    items: [{ label: 'Cerrar sesión', value: 'signout', icon: 'log-out', variant: 'destructive' }],
  },
];

const SHORTCUT_GROUPS: DropdownGroup[] = [
  {
    items: [
      { label: 'Editar', value: 'edit', icon: 'pencil', shortcut: '⌘E' },
      { label: 'Duplicar', value: 'duplicate', icon: 'copy', shortcut: '⌘D', dividerAfter: true },
      { label: 'Eliminar', value: 'delete', icon: 'trash-2', variant: 'destructive' },
    ],
  },
];

const VARIANT_GROUPS: DropdownGroup[] = [
  {
    items: [
      { label: 'Ítem por defecto', value: 'default', icon: 'pencil' },
      { label: 'Ítem success', value: 'success', icon: 'download', variant: 'success' },
      { label: 'Ítem destructivo', value: 'destructive', icon: 'trash-2', variant: 'destructive' },
      { label: 'Ítem deshabilitado', value: 'disabled', icon: 'settings', disabled: true },
    ],
  },
];

const SIZE_GROUPS: DropdownGroup[] = [
  {
    items: [
      { label: 'Opción A', value: 'a' },
      { label: 'Opción B', value: 'b' },
      { label: 'Opción C', value: 'c' },
    ],
  },
];

const INPUT_OPTIONS: InputDropdownOption[] = [
  { value: 'design', label: 'Sistema de diseño' },
  { value: 'engineering', label: 'Ingeniería' },
  { value: 'product', label: 'Producto' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Ventas' },
  { value: 'support', label: 'Soporte al cliente', disabled: true },
];

const SIZES: DropdownSize[] = ['xs', 'sm', 'md', 'lg'];

@Component({
  selector: 'app-dropdown-page',
  imports: [Dropdown, InputDropdown, DemoShell],
  templateUrl: './dropdown-page.html',
  styleUrl: './dropdown-page.css',
})
export class DropdownPage {
  protected readonly sizes = SIZES;
  protected readonly simpleGroups = SIMPLE_GROUPS;
  protected readonly variantGroups = VARIANT_GROUPS;
  protected readonly sizeGroups = SIZE_GROUPS;
  protected readonly groupedGroups = GROUPED_GROUPS;
  protected readonly inputOptions = INPUT_OPTIONS;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Trigger', key: 'trigger', options: ['button', 'icon'], default: 'button' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'sm' },
    { kind: 'select', label: 'Posición', key: 'position', options: ['left', 'right'], default: 'left' },
    { kind: 'toggle', label: 'Encabezado', key: 'showHeader', default: false },
    { kind: 'toggle', label: 'Atajos', key: 'shortcuts', default: false },
  ];

  protected readonly pgTrigger = signal<DropdownTrigger>('button');
  protected readonly pgSize = signal<DropdownSize>('sm');
  protected readonly pgPosition = signal<DropdownPosition>('left');
  protected readonly pgShowHeader = signal(false);
  protected readonly pgShortcuts = signal(false);

  protected onPlaygroundState(s: DemoState): void {
    if (s['trigger']) this.pgTrigger.set(s['trigger'] as DropdownTrigger);
    if (s['size']) this.pgSize.set(s['size'] as DropdownSize);
    if (s['position']) this.pgPosition.set(s['position'] as DropdownPosition);
    if (s['showHeader'] !== undefined) this.pgShowHeader.set(!!s['showHeader']);
    if (s['shortcuts'] !== undefined) this.pgShortcuts.set(!!s['shortcuts']);
  }

  protected readonly pgGroups = computed(() => (this.pgShortcuts() ? SHORTCUT_GROUPS : SIMPLE_GROUPS));
  protected readonly pgHeader = computed(() => (this.pgShowHeader() ? 'Acciones' : undefined));

  protected readonly pgCode = computed(() => {
    const lines = [
      `<cs-dropdown`,
      `  trigger="${this.pgTrigger()}"`,
      `  size="${this.pgSize()}"`,
      `  position="${this.pgPosition()}"`,
    ];
    if (this.pgShowHeader()) lines.push(`  header="Acciones"`);
    lines.push(`  [groups]="groups"`, `></cs-dropdown>`);
    return lines.join('\n');
  });

  /* Ítems de checkbox */
  protected readonly checkedState = signal<Record<string, boolean>>({ todo: true });
  protected readonly checkboxGroups = computed<DropdownGroup[]>(() => {
    const checked = this.checkedState();
    return [
      {
        header: 'Categorías',
        selectionMode: 'checkbox',
        items: [
          { label: 'Por hacer', value: 'todo', selected: !!checked['todo'] },
          { label: 'En progreso', value: 'inprogress', selected: !!checked['inprogress'] },
          { label: 'Hecho', value: 'done', selected: !!checked['done'] },
        ],
      },
    ];
  });
  protected onCheckboxSelect(item: DropdownItem): void {
    if (!item.value) return;
    this.checkedState.update((prev) => ({ ...prev, [item.value as string]: !prev[item.value as string] }));
  }

  /* Ítems de radio */
  protected readonly radioSelected = signal('detail');
  protected readonly radioGroups = computed<DropdownGroup[]>(() => [
    {
      header: 'Vistas',
      selectionMode: 'radio',
      items: [
        { label: 'Vista detallada', value: 'detail', selected: this.radioSelected() === 'detail' },
        { label: 'Vista de lista', value: 'list', selected: this.radioSelected() === 'list' },
      ],
    },
  ]);
  protected onRadioSelect(item: DropdownItem): void {
    if (item.value) this.radioSelected.set(item.value);
  }

  /* Input Dropdown — Playground */
  protected readonly inputPlaygroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tamaño', key: 'size', options: SIZES, default: 'md' },
    { kind: 'toggle', label: 'Etiqueta', key: 'showLabel', default: true },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: false },
    { kind: 'toggle', label: 'Deshabilitado', key: 'disabled', default: false },
  ];

  protected readonly ipgSize = signal<DropdownSize>('md');
  protected readonly ipgShowLabel = signal(true);
  protected readonly ipgRequired = signal(false);
  protected readonly ipgDisabled = signal(false);
  protected readonly ipgValue = signal('');

  protected onInputPlaygroundState(s: DemoState): void {
    if (s['size']) this.ipgSize.set(s['size'] as DropdownSize);
    if (s['showLabel'] !== undefined) this.ipgShowLabel.set(!!s['showLabel']);
    if (s['required'] !== undefined) this.ipgRequired.set(!!s['required']);
    if (s['disabled'] !== undefined) this.ipgDisabled.set(!!s['disabled']);
  }

  protected readonly ipgCode = computed(() => {
    const lines = [`<cs-input-dropdown`];
    if (this.ipgShowLabel()) lines.push(`  label="Equipo"`);
    lines.push(`  placeholder="Selecciona un equipo…"`, `  size="${this.ipgSize()}"`);
    if (this.ipgRequired()) lines.push(`  [required]="true"`);
    if (this.ipgDisabled()) lines.push(`  [disabled]="true"`);
    lines.push(`  [options]="options"`, `  [value]="value"`, `  (valueChange)="value = $event"`, `></cs-input-dropdown>`);
    return lines.join('\n');
  });

  /* Input Dropdown — Estados */
  protected readonly stateValueFilled = signal('engineering');
}
