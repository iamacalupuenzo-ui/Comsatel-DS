import { Component, Input } from '@angular/core';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';

/**
 * Estado vacío: explica por qué no hay contenido y qué puede hacer la
 * persona. Úsalo dentro de `[emptyState]` de Table o en cualquier zona sin
 * resultados. Las acciones (por ejemplo «Limpiar filtros») se proyectan.
 * Para un error de carga en una tabla usa `error` de Table, no este estado.
 */
@Component({
  selector: 'cs-empty-state',
  imports: [Icon],
  template: `
    @if (icon) {
      <cs-icon class="cs-empty-state__icon" [name]="icon" [size]="40" aria-hidden="true" />
    }
    <div class="cs-empty-state__text">
      <p class="cs-empty-state__title">{{ title }}</p>
      @if (description) {
        <p class="cs-empty-state__description">{{ description }}</p>
      }
    </div>
    <div class="cs-empty-state__actions"><ng-content /></div>
  `,
  host: {
    class: 'cs-empty-state',
    role: 'status',
  },
  styles: [
    `
      :host {
        display: grid;
        justify-items: center;
        gap: var(--layout-gap-lg);
        text-align: center;
      }
      .cs-empty-state__icon {
        color: var(--color-text-brand-default);
      }
      .cs-empty-state__text {
        display: grid;
        gap: var(--layout-gap-md);
        max-width: calc(var(--layout-size-3xl) * 5);
      }
      .cs-empty-state__title,
      .cs-empty-state__description {
        margin: 0;
        font-family: var(--font-family-content);
      }
      .cs-empty-state__title {
        color: var(--color-text-base-default);
        font-size: var(--font-size-content-caption);
        line-height: var(--font-line-height-content-caption);
        font-weight: var(--font-weight-emphasis);
      }
      .cs-empty-state__description {
        color: var(--color-text-base-subtle);
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
      }
      .cs-empty-state__actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--layout-gap-md);
      }
      .cs-empty-state__actions:empty {
        display: none;
      }
    `,
  ],
})
export class EmptyState {
  /** Qué pasó, en una frase: «No encontramos capturas». */
  @Input({ required: true }) title = '';
  /** Qué puede hacer la persona: «Prueba con otra orden o estado». */
  @Input() description = '';
  /** Ícono ilustrativo opcional, 40 px en el color de marca. */
  @Input() icon?: IconName;
}
