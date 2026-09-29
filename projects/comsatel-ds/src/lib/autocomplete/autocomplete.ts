import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, computed, signal } from '@angular/core';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';
import { InputGroup } from '../input/input-group';
import { InputGroupAddon } from '../input/input-group-addon';
import { InputGroupClear } from '../input/input-group-clear';
import { InputGroupInput } from '../input/input-group-input';
import type { InputFieldSize } from '../input/input-tokens';
import { Popover } from '../popover/popover';

export interface AutocompleteOption {
  /** Valor que se emite al elegir la opción. */
  value: string;
  /** Texto principal: se muestra en la lista y queda en el campo al elegirla. */
  label: string;
  /** Texto de apoyo a la derecha del label, por ejemplo el motor de una unidad. */
  description?: string;
  /** Ícono decorativo de la opción, por ejemplo el tipo de unidad. */
  icon?: IconName;
  /** Texto contra el que se busca; sin él, label + description. Permite buscar por datos que no se muestran. */
  searchText?: string;
  disabled?: boolean;
}

let uid = 0;

/**
 * Campo de búsqueda que filtra una lista larga mientras se escribe y permite elegir una opción.
 * Sigue el patrón combobox de ARIA: el foco se queda en el campo y la opción activa se anuncia con
 * aria-activedescendant. La lista se abre solo al escribir el mínimo de caracteres, no al enfocar.
 * Escribir de nuevo después de elegir borra la selección (emite '').
 */
@Component({
  selector: 'cs-autocomplete',
  // El id va en el control interno; en el host quedaría duplicado y el label apuntaría al host.
  host: { '[attr.id]': 'null' },
  imports: [Icon, InputGroup, InputGroupAddon, InputGroupClear, InputGroupInput, Popover],
  templateUrl: './autocomplete.html',
  styleUrl: './autocomplete.css',
})
export class Autocomplete implements OnChanges {
  @Input() id?: string;
  @Input() label?: string;
  @Input('aria-label') ariaLabel = '';
  @Input() placeholder = '';
  @Input() options: AutocompleteOption[] = [];
  /** Valor elegido (el `value` de una opción); '' si no hay selección. */
  @Input() value = '';
  @Output() readonly valueChange = new EventEmitter<string>();
  /** Caracteres mínimos para abrir la lista. */
  @Input() minChars = 1;
  @Input() size: InputFieldSize = 'md';
  @Input() leadingIcon: IconName = 'search';
  @Input() required = false;
  @Input() invalid = false;
  /** Mensaje de error visible debajo del campo; se enlaza con aria-errormessage. */
  @Input() errorMessage = '';
  @Input() readonly = false;
  @Input() disabled = false;
  /** Filtro aplicado: borde, fondo y texto de selección, como Input. */
  @Input() active = false;
  /** Muestra la X para limpiar cuando hay texto. */
  @Input() clearable = true;
  @Input() clearLabel = 'Limpiar búsqueda';
  @Input() emptyText = 'Sin resultados';

  @ViewChild('group', { read: ElementRef }) protected groupRef?: ElementRef<HTMLElement>;

  private readonly uidValue = `cs-autocomplete-${++uid}`;
  protected readonly query = signal('');
  protected readonly activeIndex = signal(-1);
  private readonly searching = signal(false);
  private readonly optionsSig = signal<AutocompleteOption[]>([]);
  private readonly minCharsSig = signal(1);

  protected readonly results = computed(() => {
    const term = this.normalize(this.query().trim());
    if (term.length < this.minCharsSig()) return [];
    return this.optionsSig().filter((option) =>
      this.normalize(option.searchText ?? `${option.label} ${option.description ?? ''}`).includes(term),
    );
  });
  protected readonly isOpen = computed(
    () => this.searching() && this.query().trim().length >= this.minCharsSig(),
  );

  get inputId(): string {
    return this.id ?? this.uidValue;
  }
  get listboxId(): string {
    return `${this.inputId}-listbox`;
  }
  get errorId(): string {
    return `${this.inputId}-error`;
  }
  get labelId(): string {
    return `${this.inputId}-label`;
  }
  protected optionId(index: number): string {
    return `${this.listboxId}-${index}`;
  }
  protected get activeDescendant(): string {
    return this.isOpen() && this.activeIndex() >= 0 ? this.optionId(this.activeIndex()) : '';
  }
  protected get iconSize(): number {
    return this.size === 'sm' ? 14 : 16;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) this.optionsSig.set(this.options ?? []);
    if (changes['minChars']) this.minCharsSig.set(Math.max(0, this.minChars));
    if (changes['value'] || changes['options']) {
      const selected = this.options.find((option) => option.value === this.value);
      if (selected) this.query.set(selected.label);
      else if (!this.value && changes['value'] && !changes['value'].firstChange) this.query.set('');
    }
  }

  protected onInput(text: string): void {
    this.query.set(text);
    if (this.value) {
      this.value = '';
      this.valueChange.emit('');
    }
    this.searching.set(true);
    this.activeIndex.set(this.firstEnabled());
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.isOpen()) return;
    const items = this.results();
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!items.length) return;
      const step = event.key === 'ArrowDown' ? 1 : -1;
      let next = this.activeIndex();
      for (let i = 0; i < items.length; i++) {
        next = (next + step + items.length) % items.length;
        if (!items[next].disabled) break;
      }
      this.activeIndex.set(next);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const option = items[this.activeIndex()];
      if (option) this.select(option);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      // Solo cierra la lista: dentro de un modal no debe cerrar también el modal.
      event.stopPropagation();
      this.searching.set(false);
    }
  }

  protected onBlur(): void {
    // La elección con el puntero ocurre en mousedown (antes del blur), así que cerrar aquí es seguro.
    this.searching.set(false);
  }

  protected select(option: AutocompleteOption, event?: MouseEvent): void {
    event?.preventDefault();
    if (option.disabled) return;
    this.query.set(option.label);
    this.value = option.value;
    this.searching.set(false);
    this.activeIndex.set(-1);
    this.valueChange.emit(option.value);
  }

  protected onCleared(): void {
    this.query.set('');
    this.searching.set(false);
    if (this.value) {
      this.value = '';
      this.valueChange.emit('');
    }
  }

  private firstEnabled(): number {
    return this.results().findIndex((option) => !option.disabled);
  }

  private normalize(text: string): string {
    return text.toLocaleLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
}
