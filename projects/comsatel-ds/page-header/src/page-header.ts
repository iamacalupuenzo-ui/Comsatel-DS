import { Component, Input } from '@angular/core';

/**
 * Encabezado de una pantalla: título (h1), descripción y acciones
 * principales a la derecha. Las acciones se proyectan (por ejemplo
 * `cs-button`). Hasta 960 px las acciones bajan debajo del título; hasta
 * 767 px se apilan a todo el ancho.
 */
@Component({
  selector: 'cs-page-header',
  template: `
    <div class="cs-page-header">
      <div class="cs-page-header__content">
        <h1 class="cs-page-header__title" [id]="titleId || null">{{ title }}</h1>
        @if (description) {
          <p class="cs-page-header__description">{{ description }}</p>
        }
      </div>
      <div class="cs-page-header__actions"><ng-content /></div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .cs-page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--layout-gap-xl);
      }
      .cs-page-header__content {
        display: grid;
        gap: var(--layout-gap-xs);
        min-width: 0;
      }
      .cs-page-header__title,
      .cs-page-header__description {
        margin: 0;
      }
      .cs-page-header__title {
        color: var(--color-text-base-default);
        font-family: var(--font-family-heading);
        font-size: var(--font-size-heading-small);
        line-height: var(--font-line-height-heading-small);
        font-weight: var(--font-weight-bold);
      }
      .cs-page-header__description {
        color: var(--color-text-base-subtle);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
      }
      .cs-page-header__actions {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: var(--layout-gap-md);
      }
      .cs-page-header__actions:empty {
        display: none;
      }
      @media (max-width: 960px) {
        .cs-page-header {
          align-items: stretch;
          flex-direction: column;
        }
        .cs-page-header__actions {
          justify-content: flex-start;
        }
      }
      @media (max-width: 767px) {
        .cs-page-header__actions {
          align-items: stretch;
          flex-direction: column;
        }
      }
    `,
  ],
})
export class PageHeader {
  @Input({ required: true }) title = '';
  @Input() description = '';
  /** Id del h1, para que la sección o el `<main>` lo usen en `aria-labelledby`. */
  @Input() titleId = '';
}
