import { afterEveryRender, AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, ViewChild, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { INPUT_TOKENS } from './dropdown-tokens';
import type { DropdownSize, InputDropdownOption } from './dropdown-types';
import type { IconName } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { CountryFlag } from './country-flag';
import { Popover } from '../popover/popover';
import { fieldLabelTypography } from '../input/input-tokens';
import { textStyle } from '../tokens/typography';

let uid = 0;

// Puerto 1:1 de InputDropdown en dropdown.tsx — combobox tipo <select>
// vinculado a un valor. El span de medición oculto (measRef en React) evita
// que el trigger cambie de ancho cada vez que se selecciona una opción más
// corta o más larga.
@Component({
  selector: 'cs-input-dropdown',
  // El id va en el control interno; en el host quedaría duplicado y el label apuntaría al host.
  host: { '[attr.id]': 'null' },
  imports: [NgStyle, CountryFlag, Icon, Popover],
  templateUrl: './input-dropdown.html',
  styleUrl: './input-dropdown.css',
})
export class InputDropdown implements AfterViewInit, OnChanges {
  @Input() id?: string;
  @Input() name = '';
  @Input() label?: string;
  @Input() placeholder = 'Select an option';
  @Input() options: InputDropdownOption[] = [];
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() size: DropdownSize = 'md';
  @Input() disabled = false;
  @Input() required = false;
  @Input() readonly = false;
  @Input() invalid = false;
  @Input('aria-label') ariaLabel = '';
  @Input('aria-labelledby') ariaLabelledby = '';
  @Input('aria-describedby') ariaDescribedby = '';
  @Input('aria-errormessage') ariaErrormessage = '';
  // Modo embebido — para usarlo dentro de un cs-input-group-addon (ej. el
  // selector de código de país de un campo de teléfono). El trigger deja de
  // dibujar su propio borde/fondo/anillo de foco (el grupo ya los da) y
  // expone data-slot="input-group-control" para que
  // .cs-input-group:has(...) reaccione a su foco/apertura igual que
  // reacciona al <input> real. Sin esto, un InputDropdown metido en un
  // grupo se veía como un "select" completo anidado dentro de otro campo
  // completo — doble marco, y sin escalar con el tamaño del grupo si nadie
  // le pasaba [size] a mano (hallazgo real: Playground de Input, tipo
  // "Dropdown al inicio"/"al final").
  @Input() embedded = false;
  // Estira el trigger a lo ancho de su contenedor en vez de encogerse a su
  // contenido (:host es inline-flex por defecto). El propio trigger ya es
  // width:100% de su wrap — falta que host/wrap dejen de ser "auto" y
  // pasen a ocupar el 100% real del padre. Distinto de `embedded`: acá SÍ
  // conserva su borde/fondo propios (sigue viéndose como un campo
  // completo), solo cambia de ancho. Caso real: el campo de hora de
  // DateTimePicker vive en un wrapper de ancho fijo (FIELD_WIDTH) pero el
  // trigger se quedaba en su ancho de contenido natural, dejando un hueco
  // enorme entre el valor mostrado y el botón de limpiar de al lado.
  @Input() fullWidth = false;
  /** Optativo: conserva por defecto el ancho por contenido del menú. */
  @Input() matchTriggerWidth = false;
  /** @deprecated Desde 0.3.5: la superficie crema se descartó y se eliminará en 0.4.0. No la uses. */
  @Input() surface: 'default' | 'secondary' = 'default';
  /** Filtro aplicado: borde, fondo y texto de selección. Foco, apertura y error tienen prioridad. */
  @Input() active = false;
  /**
   * Menú ajustado al campo: mide como mínimo el ancho del trigger y crece con la opción más
   * larga hasta el borde visible de la ventana; recién ahí la opción parte el texto en dos líneas.
   * Pensado para filtros de barra, donde el menú no debe quedar más angosto que el campo.
   */
  @Input() menuFit = false;
  /** Ícono decorativo al inicio del campo, para filtros compactos que se reconocen por su ícono (por ejemplo, estado o financiera). */
  @Input() leadingIcon?: IconName;

  @HostBinding('class.cs-input-dropdown-host--embedded') get isEmbeddedHost(): boolean {
    return this.embedded;
  }
  @HostBinding('class.cs-input-dropdown-host--full') get isFullWidthHost(): boolean {
    return this.fullWidth;
  }

  protected readonly open = signal(false);
  protected readonly focused = signal(false);
  protected readonly minWidth = signal<number | undefined>(undefined);
  protected readonly menuMinWidth = signal<number | null>(null);
  protected readonly menuMaxWidth = signal<number | null>(null);
  protected readonly triggerId = `cs-input-dropdown-${++uid}`;
  protected readonly menuId = `${this.triggerId}-menu`;

  @ViewChild('triggerButton') protected triggerRef?: ElementRef<HTMLButtonElement>;

  @ViewChild('measure') measureRef?: ElementRef<HTMLSpanElement>;

  private pendingFocus: 'selected' | 'first' | 'last' | null = null;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    afterEveryRender(() => {
      if (!this.open() || !this.pendingFocus) return;
      const options = this.enabledOptionElements();
      const selected = options.find((element) => element.getAttribute('aria-selected') === 'true');
      const option = this.pendingFocus === 'last' ? options.at(-1) : this.pendingFocus === 'selected' ? (selected ?? options[0]) : options[0];
      // Popover publica su posición en otro render; un nodo oculto no recibe foco.
      if (option && getComputedStyle(option).visibility !== 'hidden') {
        this.pendingFocus = null;
        option.focus();
      }
    });
  }

  get resolvedId(): string {
    return this.id ?? this.triggerId;
  }

  get labelId(): string {
    return `${this.resolvedId}-label`;
  }

  ngAfterViewInit(): void {
    this.remeasure();
  }

  ngOnChanges(): void {
    this.remeasure();
  }

  private remeasure(): void {
    queueMicrotask(() => {
      if (this.measureRef) this.minWidth.set(this.measureRef.nativeElement.scrollWidth);
    });
  }

  get tok() {
    return INPUT_TOKENS[this.size];
  }

  get labelStyle(): Record<string, string> {
    return textStyle(fieldLabelTypography[this.size], 'accent');
  }

  get selectedOption(): InputDropdownOption | undefined {
    return this.options.find((o) => o.value === this.value);
  }

  get widestLabel(): string {
    if (this.options.length === 0) return this.placeholder ?? '';
    return this.options
      .map((option) => this.triggerText(option))
      .reduce((widest, label) => (widest.length >= label.length ? widest : label));
  }

  get selectedTriggerLabel(): string {
    return this.selectedOption ? this.triggerText(this.selectedOption) : this.placeholder;
  }

  get hasVisualPrefix(): boolean {
    return this.options.some((option) => !!option.countryFlag || !!option.leadingText);
  }

  private triggerText(option: InputDropdownOption): string {
    return option.triggerLabel ?? option.label;
  }

  get borderColor(): string {
    if (this.embedded) return 'transparent';
    if (this.disabled) return 'var(--color-border-neutral-subtle)';
    if (this.invalid) return 'var(--color-border-danger-default)';
    if (this.focused() || this.open()) return 'var(--color-border-brand-default)';
    if (this.active) return 'var(--color-border-selected)';
    return this.surface === 'secondary' ? 'var(--color-border-secondary-default)' : 'var(--color-border-neutral-default)';
  }
  get extraShadow(): string {
    if (this.embedded) return 'none';
    if (this.invalid && !this.disabled) return '0 0 0 var(--layout-border-thick) var(--color-border-danger-subtle)';
    return !this.disabled && (this.focused() || this.open()) ? '0 0 0 var(--layout-border-thick) var(--color-border-brand-subtle)' : 'none';
  }
  get textColor(): string {
    if (this.disabled) return 'var(--color-text-disabled)';
    if (this.isActiveVisual) return 'var(--color-text-selected)';
    if (this.surface === 'secondary') return 'var(--color-text-secondary-default)';
    return this.selectedOption ? 'var(--color-text-base-default)' : 'var(--color-text-base-subtlest)';
  }

  /** Estado aplicado visible: cede ante foco, apertura, error y disabled. */
  get isActiveVisual(): boolean {
    return this.active && !this.embedded && !this.disabled && !this.invalid && !this.open() && !this.focused();
  }

  toggle(): void {
    if (this.disabled || this.readonly) return;
    const willOpen = !this.open();
    if (willOpen) this.measureMenu();
    this.pendingFocus = willOpen ? 'selected' : null;
    this.open.set(willOpen);
    this.focused.set(true);
  }

  /** La etiqueta nombra el campo y le da foco, pero no abre la lista (igual que un select nativo). */
  onLabelClick(event: MouseEvent): void {
    event.preventDefault();
    this.triggerRef?.nativeElement.focus();
  }

  private measureMenu(): void {
    if (!this.menuFit) return;
    const rect = this.triggerRef?.nativeElement.getBoundingClientRect();
    if (!rect) return;
    this.menuMinWidth.set(rect.width);
    this.menuMaxWidth.set(Math.max(rect.width, window.innerWidth - rect.left - 16));
  }

  private close(restoreFocus = false): void {
    this.pendingFocus = null;
    this.open.set(false);
    this.focused.set(false);
    if (restoreFocus) queueMicrotask(() => this.triggerRef?.nativeElement.focus());
  }

  private focusOption(last = false): void {
    this.pendingFocus = last ? 'last' : 'first';
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (this.disabled || this.readonly) return;
    if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      if (event.key === 'Escape' && this.open()) {
        event.preventDefault();
        this.close(true);
      }
      return;
    }
    event.preventDefault();
    if (!this.open()) {
      this.measureMenu();
      this.open.set(true);
      this.pendingFocus = event.key === 'ArrowUp' ? 'last' : 'selected';
      return;
    }
    this.focusOption(event.key === 'ArrowUp');
  }

  onOptionsKeydown(event: KeyboardEvent): void {
    const options = this.enabledOptionElements();
    if (!options.length) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      // Solo cierra esta lista: dentro de otro panel flotante no debe cerrar también el de afuera.
      event.stopPropagation();
      this.close(true);
      return;
    }
    if (event.key === 'Tab') {
      this.close();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const current = options.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? options.length - 1
        : (current + (event.key === 'ArrowUp' ? -1 : 1) + options.length) % options.length;
    options[next]?.focus();
  }

  onFocus(): void {
    this.focused.set(true);
  }
  onBlur(): void {
    if (!this.open()) this.focused.set(false);
  }

  selectOption(opt: InputDropdownOption): void {
    if (opt.disabled || this.readonly) return;
    this.valueChange.emit(opt.value);
    this.close(true);
  }

  protected onPopoverClosed(): void {
    if (this.open()) {
      this.close();
    }
  }

  private enabledOptionElements(): HTMLButtonElement[] {
    return Array.from(document.querySelectorAll<HTMLButtonElement>(`#${this.menuId} [role="option"]:not(:disabled)`));
  }
}
