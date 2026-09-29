import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { INPUT_FIELD_TOKENS, type InputFieldSize } from './input-tokens';

let uid = 0;

// Puerto 1:1 de InputGroupInput — el mismo <input> que cs-input pero sin
// borde/fondo propios (el grupo los da), y con data-slot="input-group-control"
// para que InputGroup lo detecte vía :has().
@Component({
  selector: 'cs-input-group-input',
  // El id va en el control interno; en el host quedaría duplicado y el label apuntaría al host.
  host: { '[attr.id]': 'null' },
  templateUrl: './input-group-input.html',
  styleUrl: './input-group-input.css',
})
export class InputGroupInput implements OnChanges {
  @Input() fieldSize: InputFieldSize = 'md';
  @Input() type = 'text';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() autocomplete = '';
  @Input() required = false;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input('aria-label') ariaLabel = '';
  @Input('aria-labelledby') ariaLabelledby = '';
  @Input('aria-describedby') ariaDescribedby = '';
  @Input('aria-errormessage') ariaErrormessage = '';
  @Input() min?: string | number;
  @Input() max?: string | number;
  @Input() step?: string | number;
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  // Opcionales — solo los usa un campo compuesto que necesita anunciar un
  // popover propio (ej. el campo de fecha de DateTimePicker, que abre el
  // calendario al enfocarse). El resto de usos de InputGroupInput los deja
  // sin setear y no cambia nada.
  @Input() id?: string;
  @Input() ariaHasPopup?: string;
  @Input() ariaExpanded?: boolean;
  @Input() ariaControls?: string;
  /** Rol ARIA del campo; por ejemplo, `combobox` en un autocompletado. */
  @Input() role?: string;
  /** Opción activa de la lista asociada (patrón combobox): el foco se queda en el campo. */
  @Input() ariaActivedescendant?: string;
  @Output() focused = new EventEmitter<void>();
  @Output() blurred = new EventEmitter<void>();
  @Output() enterKey = new EventEmitter<void>();
  @Output() escapeKey = new EventEmitter<void>();

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value'] && !changes['value'].firstChange) {
      this.element.nativeElement.dispatchEvent(new CustomEvent('cs-input-group-value-sync', {
        bubbles: true,
        detail: this.value,
      }));
    }
  }

  private readonly autoId = `cs-input-group-input-${++uid}`;

  get tok() {
    return INPUT_FIELD_TOKENS[this.fieldSize];
  }

  get resolvedId(): string {
    return this.id ?? this.autoId;
  }

  onInput(value: string): void {
    this.value = value;
    this.valueChange.emit(value);
  }
}
