import { AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnChanges, Output, ViewChild, signal } from '@angular/core';
import { Icon } from '../icons/icon';
import { INPUT_TOKENS } from './dropdown-tokens';
import type { DropdownSize, InputDropdownOption } from './dropdown-types';

let uid = 0;

// Puerto 1:1 de InputDropdown en dropdown.tsx — combobox tipo <select>
// vinculado a un valor. El span de medición oculto (measRef en React) evita
// que el trigger cambie de ancho cada vez que se selecciona una opción más
// corta o más larga.
@Component({
  selector: 'cs-input-dropdown',
  imports: [Icon],
  templateUrl: './input-dropdown.html',
  styleUrl: './input-dropdown.css',
})
export class InputDropdown implements AfterViewInit, OnChanges {
  @Input() label?: string;
  @Input() placeholder = 'Selecciona una opción';
  @Input() options: InputDropdownOption[] = [];
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() size: DropdownSize = 'md';
  @Input() disabled = false;
  @Input() required = false;
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

  @HostBinding('class.cs-input-dropdown-host--embedded') get isEmbeddedHost(): boolean {
    return this.embedded;
  }
  @HostBinding('class.cs-input-dropdown-host--full') get isFullWidthHost(): boolean {
    return this.fullWidth;
  }

  protected readonly open = signal(false);
  protected readonly focused = signal(false);
  protected readonly minWidth = signal<number | undefined>(undefined);
  protected readonly triggerId = `cs-input-dropdown-${++uid}`;
  protected readonly menuId = `${this.triggerId}-menu`;

  @ViewChild('measure') measureRef?: ElementRef<HTMLSpanElement>;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

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

  get selectedOption(): InputDropdownOption | undefined {
    return this.options.find((o) => o.value === this.value);
  }

  get widestLabel(): string {
    if (this.options.length === 0) return this.placeholder ?? '';
    return this.options.reduce((a, b) => (a.label.length >= b.label.length ? a : b)).label;
  }

  get borderColor(): string {
    if (this.embedded) return 'transparent';
    if (this.disabled) return 'var(--color-border-neutral-subtle)';
    if (this.focused() || this.open()) return 'var(--color-border-brand-default)';
    return 'var(--color-border-neutral-default)';
  }
  get extraShadow(): string {
    if (this.embedded) return 'none';
    return !this.disabled && (this.focused() || this.open()) ? '0 0 0 2px var(--color-border-brand-subtle)' : 'none';
  }
  get textColor(): string {
    if (this.disabled) return 'var(--color-text-disabled)';
    return this.selectedOption ? 'var(--color-text-base-default)' : 'var(--color-text-base-subtlest)';
  }

  toggle(): void {
    if (this.disabled) return;
    this.open.update((v) => !v);
    this.focused.set(true);
  }

  onFocus(): void {
    this.focused.set(true);
  }
  onBlur(): void {
    if (!this.open()) this.focused.set(false);
  }

  selectOption(opt: InputDropdownOption): void {
    if (opt.disabled) return;
    this.valueChange.emit(opt.value);
    this.open.set(false);
    this.focused.set(false);
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
      this.focused.set(false);
    }
  }
}
