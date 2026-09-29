import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';

/**
 * Lista de pares etiqueta y valor para el detalle de un registro (placa,
 * contrato, estado…). Se aplica sobre un `<dl>` nativo para conservar la
 * semántica de término y definición: `<dl csDescriptionList>`. Cada par es
 * un `<div csDescriptionItem label="…">` con el valor proyectado.
 *
 * Usa selectores de atributo a propósito: un elemento propio entre `<dl>` y
 * `<dt>/<dd>` rompería la estructura que leen los lectores de pantalla.
 */
@Component({
  selector: 'dl[csDescriptionList]',
  template: `<ng-content />`,
  host: {
    class: 'cs-description-list',
    '[attr.data-columns]': 'columns',
  },
  styles: [
    `
      :host {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--layout-gap-lg);
        margin: 0;
      }
      :host([data-columns='1']) {
        grid-template-columns: minmax(0, 1fr);
      }
      /* En pantallas angostas, una sola columna. */
      @media (max-width: 767px) {
        :host {
          grid-template-columns: minmax(0, 1fr);
        }
      }
    `,
  ],
})
export class DescriptionList {
  /** Columnas en pantallas anchas. Hasta 767 px siempre es una. */
  @Input() columns: 1 | 2 = 2;
}

@Component({
  selector: 'div[csDescriptionItem]',
  imports: [Icon],
  template: `
    <dt class="cs-description-item__label">{{ label }}</dt>
    <dd class="cs-description-item__value">
      <span class="cs-description-item__content"><ng-content /></span>
      @if (editLabel) {
        <button type="button" class="cs-description-item__edit" [attr.aria-label]="editLabel" (click)="edit.emit()">
          <cs-icon name="pencil" [size]="12" aria-hidden="true" />
        </button>
      }
    </dd>
  `,
  host: {
    class: 'cs-description-item',
    '[class.cs-description-item--full]': 'fullWidth',
  },
  styles: [
    `
      :host {
        display: grid;
        min-width: 0;
        gap: var(--layout-gap-xs);
      }
      :host(.cs-description-item--full) {
        grid-column: 1 / -1;
      }
      .cs-description-item__label {
        color: var(--color-text-base-subtle);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
      .cs-description-item__value {
        display: flex;
        align-items: center;
        gap: var(--layout-gap-2xs);
        min-width: 0;
        margin: 0;
        color: var(--color-text-base-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
        font-weight: var(--font-weight-accent);
      }
      /* El valor puede ser texto, un ícono con texto o un Tag. */
      .cs-description-item__content {
        display: inline-flex;
        align-items: center;
        gap: var(--layout-gap-xs);
        min-width: 0;
        overflow-wrap: anywhere;
      }
      .cs-description-item__edit {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        padding: var(--layout-padding-2xs);
        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-icon-neutral-subtlest);
        cursor: pointer;
      }
      .cs-description-item__edit:hover {
        color: var(--color-text-brand-default);
        background: var(--color-background-neutral-subtlest);
      }
      .cs-description-item__edit:focus-visible {
        outline: none;
        box-shadow: 0 0 0 var(--layout-border-thick) var(--color-border-focused);
      }
    `,
  ],
})
export class DescriptionItem {
  /** Término: qué es el dato («Placa», «Contrato»). */
  @Input({ required: true }) label = '';
  /** Ocupa todo el ancho de la lista, para textos largos como una observación. */
  @Input() fullWidth = false;
  /** Si tiene texto, muestra un lápiz para editar el dato; es su nombre accesible. */
  @Input() editLabel = '';
  @Output() readonly edit = new EventEmitter<void>();
}
