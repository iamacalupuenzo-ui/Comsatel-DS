import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';
import { DropdownItemComponent } from '@iamacalupuenzo-ui/comsatel-ds/dropdown';
import type { DropdownItem } from '@iamacalupuenzo-ui/comsatel-ds/dropdown';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { Popover } from '@iamacalupuenzo-ui/comsatel-ds/popover';

/**
 * Menú de acciones de una fila de Table: un botón de puntos suspensivos y un
 * menú con las acciones de esa fila. El menú se abre en la capa de Popover,
 * así que no lo recorta el desplazamiento horizontal de la tabla. Úsalo en la
 * columna de acciones con `sticky: 'end'`. El ancho del menú sigue la regla
 * de Dropdown: por contenido, entre 128 y 280 px.
 */
@Component({
  selector: 'cs-table-row-actions',
  imports: [DropdownItemComponent, Icon, Popover],
  template: `
    <span #trigger class="cs-table-row-actions">
      <button
        type="button"
        class="cs-table-row-actions__trigger"
        [class.cs-table-row-actions__trigger--open]="open()"
        aria-haspopup="menu"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="ariaLabel"
        [disabled]="!items.length"
        (click)="open.set(!open())"
      >
        <cs-icon name="more-horizontal" [size]="16" aria-hidden="true" />
      </button>
    </span>
    <cs-popover
      [isOpen]="open()"
      [triggerRef]="triggerRef"
      placement="bottom-end"
      [offset]="4"
      role="menu"
      [ariaLabel]="ariaLabel"
      (closed)="open.set(false)"
    >
      <div class="cs-table-row-actions__menu">
        @if (heading) {
          <p class="cs-table-row-actions__heading">{{ heading }}</p>
          <div class="cs-table-row-actions__divider" aria-hidden="true"></div>
        }
        @for (item of items; track item.value ?? item.label) {
          <cs-dropdown-item [item]="item" size="sm" selectionMode="none" (itemSelect)="choose($event)" />
          @if (item.dividerAfter) {
            <div class="cs-table-row-actions__divider" aria-hidden="true"></div>
          }
        }
      </div>
    </cs-popover>
  `,
  styles: [
    `
      :host { display: inline-flex; }
      .cs-table-row-actions { display: inline-flex; }
      .cs-table-row-actions__trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--layout-size-sm);
        height: var(--layout-size-sm);
        padding: 0;
        border: none;
        border-radius: var(--radius-xs);
        background: transparent;
        color: var(--color-text-base-subtle);
        cursor: pointer;
        transition: color var(--motion-duration-leaving) var(--motion-easing-default);
      }
      /* Sin fondo propio al pasar el cursor: la fila ya tiene su hover y un
         segundo rectángulo claro encima se ve como un error. */
      .cs-table-row-actions__trigger:hover,
      .cs-table-row-actions__trigger--open {
        color: var(--color-text-brand-default);
      }
      .cs-table-row-actions__trigger:focus-visible {
        outline: var(--layout-border-thick) solid var(--color-border-brand-default);
        outline-offset: var(--layout-border-thin);
      }
      .cs-table-row-actions__trigger:disabled {
        color: var(--color-text-disabled);
        cursor: not-allowed;
      }
      .cs-table-row-actions__menu {
        box-sizing: border-box;
        display: grid;
        width: max-content;
        min-width: calc(var(--layout-size-2xl) * 2);
        max-width: min(calc(var(--layout-size-3xl) * 3.5), calc(100vw - var(--layout-padding-2xl)));
        padding: var(--layout-padding-xs);
      }
      .cs-table-row-actions__heading {
        margin: 0;
        padding: var(--layout-padding-xs) var(--layout-padding-sm);
        color: var(--color-text-base-subtle);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
        font-weight: var(--font-weight-accent);
      }
      .cs-table-row-actions__divider {
        height: var(--layout-border-thin);
        margin-block: var(--layout-padding-xs);
        background: var(--color-border-divider);
      }
    `,
  ],
})
export class TableRowActions {
  /** Acciones de la fila. Sin acciones, el botón queda deshabilitado. */
  @Input() items: DropdownItem[] = [];
  /** Nombre accesible del botón y del menú; incluye el identificador de la fila. */
  @Input({ required: true }) ariaLabel = '';
  /** Título del menú. Vacío para omitirlo. */
  @Input() heading = 'Acciones';
  @Output() readonly itemSelect = new EventEmitter<DropdownItem>();

  protected readonly open = signal(false);
  @ViewChild('trigger', { static: true }) protected triggerRef!: ElementRef<HTMLElement>;

  protected choose(item: DropdownItem): void {
    this.open.set(false);
    this.itemSelect.emit(item);
  }
}
