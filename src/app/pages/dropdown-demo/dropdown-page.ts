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
} from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const SIMPLE_GROUPS: DropdownGroup[] = [
  {
    items: [
      { label: 'Edit', value: 'edit', icon: 'pencil' },
      { label: 'Duplicate', value: 'duplicate', icon: 'copy' },
      { label: 'Download', value: 'download', icon: 'download', dividerAfter: true },
      { label: 'Delete', value: 'delete', icon: 'trash-2', variant: 'destructive' },
    ],
  },
];

const GROUPED_GROUPS: DropdownGroup[] = [
  {
    header: 'Account',
    items: [
      { label: 'Profile', value: 'profile', icon: 'user' },
      { label: 'Settings', value: 'settings', icon: 'settings' },
    ],
  },
  {
    header: 'Actions',
    items: [{ label: 'Sign out', value: 'signout', icon: 'log-out', variant: 'destructive' }],
  },
];

const SHORTCUT_GROUPS: DropdownGroup[] = [
  {
    items: [
      { label: 'Edit', value: 'edit', icon: 'pencil', shortcut: '⌘E' },
      { label: 'Duplicate', value: 'duplicate', icon: 'copy', shortcut: '⌘D', dividerAfter: true },
      { label: 'Delete', value: 'delete', icon: 'trash-2', variant: 'destructive' },
    ],
  },
];

const VARIANT_GROUPS: DropdownGroup[] = [
  {
    items: [
      { label: 'Default item', value: 'default', icon: 'pencil' },
      { label: 'Success item', value: 'success', icon: 'download', variant: 'success' },
      { label: 'Destructive item', value: 'destructive', icon: 'trash-2', variant: 'destructive' },
      { label: 'Disabled item', value: 'disabled', icon: 'settings', disabled: true },
    ],
  },
];

const SIZE_GROUPS: DropdownGroup[] = [
  {
    items: [
      { label: 'Option A', value: 'a' },
      { label: 'Option B', value: 'b' },
      { label: 'Option C', value: 'c' },
    ],
  },
];

const INPUT_OPTIONS: InputDropdownOption[] = [
  { value: 'design', label: 'Design system' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Customer support', disabled: true },
];

const SIZES: DropdownSize[] = ['xs', 'sm', 'md', 'lg'];

@Component({
  selector: 'app-dropdown-page',
  imports: [Dropdown, InputDropdown, DemoShell],
  templateUrl: './dropdown-page.html',
  styleUrl: './dropdown-page.css',
})
export class DropdownPage {
  protected readonly warmValue = signal('long');
  protected readonly warmOptions: InputDropdownOption[] = [
    { value: 'all', label: 'Todas las unidades' },
    { value: 'long', label: 'Sin ubicación en los últimos treinta días' },
    { value: 'disabled', label: 'Opción no disponible', disabled: true },
  ];
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
  protected readonly pgHeader = computed(() => (this.pgShowHeader() ? 'Actions' : undefined));

  protected readonly pgCode = computed(() => {
    const lines = [
      `<cs-dropdown`,
      `  trigger="${this.pgTrigger()}"`,
      `  size="${this.pgSize()}"`,
      `  position="${this.pgPosition()}"`,
    ];
    if (this.pgShowHeader()) lines.push(`  header="Actions"`);
    lines.push(`  [groups]="groups"`, `></cs-dropdown>`);
    return lines.join('\n');
  });

  /* Ítems de checkbox */
  protected readonly checkedState = signal<Record<string, boolean>>({ todo: true });
  protected readonly checkboxGroups = computed<DropdownGroup[]>(() => {
    const checked = this.checkedState();
    return [
      {
        header: 'Categories',
        selectionMode: 'checkbox',
        items: [
          { label: 'To do', value: 'todo', selected: !!checked['todo'] },
          { label: 'In progress', value: 'inprogress', selected: !!checked['inprogress'] },
          { label: 'Done', value: 'done', selected: !!checked['done'] },
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
      header: 'Views',
      selectionMode: 'radio',
      items: [
        { label: 'Detail view', value: 'detail', selected: this.radioSelected() === 'detail' },
        { label: 'List view', value: 'list', selected: this.radioSelected() === 'list' },
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
    { kind: 'toggle', label: 'Solo lectura', key: 'readonly', default: false },
    { kind: 'toggle', label: 'Error', key: 'invalid', default: false },
    { kind: 'toggle', label: 'Filtro aplicado', key: 'active', default: false },
    { kind: 'toggle', label: 'Menú ajustado al campo', key: 'menuFit', default: false },
    { kind: 'toggle', label: 'Etiquetas de estado', key: 'tags', default: false },
  ];

  protected readonly ipgSize = signal<DropdownSize>('md');
  protected readonly ipgShowLabel = signal(true);
  protected readonly ipgRequired = signal(false);
  protected readonly ipgDisabled = signal(false);
  protected readonly ipgReadonly = signal(false);
  protected readonly ipgInvalid = signal(false);
  protected readonly ipgActive = signal(false);
  protected readonly ipgMenuFit = signal(false);
  protected readonly ipgTags = signal(false);
  protected readonly ipgValue = signal('');
  protected readonly ipgOptions = computed<InputDropdownOption[]>(() =>
    this.ipgTags()
      ? this.inputOptions.map((option, index) => ({ ...option, tag: index % 2 ? { label: 'Sin señal', tone: 'danger' as const } : { label: 'Con señal', tone: 'success' as const } }))
      : this.inputOptions,
  );

  protected onInputPlaygroundState(s: DemoState): void {
    if (s['size']) this.ipgSize.set(s['size'] as DropdownSize);
    if (s['showLabel'] !== undefined) this.ipgShowLabel.set(!!s['showLabel']);
    if (s['required'] !== undefined) this.ipgRequired.set(!!s['required']);
    if (s['disabled'] !== undefined) this.ipgDisabled.set(!!s['disabled']);
    if (s['readonly'] !== undefined) this.ipgReadonly.set(!!s['readonly']);
    if (s['invalid'] !== undefined) this.ipgInvalid.set(!!s['invalid']);
    if (s['active'] !== undefined) this.ipgActive.set(!!s['active']);
    if (s['menuFit'] !== undefined) this.ipgMenuFit.set(!!s['menuFit']);
    if (s['tags'] !== undefined) this.ipgTags.set(!!s['tags']);
  }

  /* Input Dropdown — Filtro de barra */
  protected readonly filterOptions: InputDropdownOption[] = [
    { label: 'Todos los estados', value: '' },
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'Observado', value: 'observado' },
    { label: 'Unidades sin ubicación durante los últimos treinta días', value: 'sin-ubicacion' },
  ];
  protected readonly filterValue = signal('observado');
  protected readonly gpsOptions: InputDropdownOption[] = [
    { label: 'GPS principal', value: 'principal', tag: { label: 'Con señal', tone: 'success' } },
    { label: 'GPS de respaldo', value: 'respaldo', tag: { label: 'Sin señal', tone: 'danger' } },
  ];
  protected readonly gpsValue = signal('principal');

  protected readonly ipgCode = computed(() => {
    const lines = [`<cs-input-dropdown`];
    if (this.ipgShowLabel()) lines.push(`  label="Team"`);
    lines.push(`  placeholder="Select a team…"`, `  size="${this.ipgSize()}"`);
    if (this.ipgRequired()) lines.push(`  [required]="true"`);
    if (this.ipgDisabled()) lines.push(`  [disabled]="true"`);
    if (this.ipgReadonly()) lines.push(`  [readonly]="true"`);
    if (this.ipgInvalid()) lines.push(`  [invalid]="true"`);
    if (this.ipgActive()) lines.push(`  [active]="true"`);
    if (this.ipgMenuFit()) lines.push(`  [menuFit]="true"`);
    lines.push(`  [options]="options"`, `  [value]="value"`, `  (valueChange)="value = $event"`, `></cs-input-dropdown>`);
    return lines.join('\n');
  });

  /* Input Dropdown — Estados */
  protected readonly stateValueFilled = signal('engineering');
}
