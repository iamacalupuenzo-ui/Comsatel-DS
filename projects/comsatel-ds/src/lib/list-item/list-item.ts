import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';

/** Fila compacta para navegar o ejecutar una acción sobre un recurso. */
@Component({
  selector: 'cs-list-item',
  imports: [Icon],
  templateUrl: './list-item.html',
  styleUrl: './list-item.css',
})
export class ListItem {
  /** Nombre principal del recurso. */
  @Input({ required: true }) label = '';
  /** Contexto secundario, por ejemplo ubicación o última actualización. */
  @Input() description = '';
  /** Ícono de identidad del registro curado. */
  @Input() leadingIcon: IconName | null = null;
  /** Ícono decorativo al final; se puede ocultar si la fila no navega. */
  @Input() trailingIcon: IconName | null = 'chevron-right';
  /** Muestra la fila como selección persistente, no solo como hover. */
  @Input() selected = false;
  /** Habilita aria-pressed para una selección controlada por el consumidor. */
  @Input() selectable = false;
  /** Deshabilita la acción y la retira del orden de interacción nativo. */
  @Input() disabled = false;
  /** Reemplaza el nombre accesible compuesto cuando se requiere más contexto. */
  @Input('aria-label') ariaLabel = '';
  /** Ocurre al activar la fila con puntero, Enter o Espacio. */
  @Output() activate = new EventEmitter<void>();
  /** Solicita al consumidor el nuevo estado cuando la fila es seleccionable. */
  @Output() selectedChange = new EventEmitter<boolean>();

  protected get classes(): string {
    return [
      'cs-list-item',
      this.selected ? 'cs-list-item--selected' : '',
      this.disabled ? 'cs-list-item--disabled' : '',
    ].filter(Boolean).join(' ');
  }

  protected onActivate(): void {
    if (this.disabled) return;
    if (this.selectable) this.selectedChange.emit(!this.selected);
    this.activate.emit();
  }
}
