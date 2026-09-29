import { Component, computed, input, output } from '@angular/core';
import { formatRelativeTime, toDate, type DateInput } from '../format/date-format';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import type { IconName } from '@iamacalupuenzo-ui/comsatel-ds/icons';

/**
 * Aviso de una unidad dentro del panel de notificaciones del mapa: qué
 * pasó, qué unidad, hace cuánto y cuántas veces. Toda la tarjeta centra la
 * unidad en el mapa (`selected`); la X la descarta (`dismissed`). Las
 * acciones secundarias («Seguir unidad») se proyectan y van en su propia
 * fila para no competir con el clic principal.
 *
 * Va dentro de un `cs-map-panel` con `listLabel`, que le da el `role="list"`.
 */
@Component({
  selector: 'cs-map-notification',
  imports: [Icon],
  host: {
    class: 'cs-map-notification',
    role: 'listitem',
    '[class.cs-map-notification--unread]': 'unread()',
  },
  template: `
    <button type="button" class="cs-map-notification__main" [attr.aria-label]="resolvedSelectLabel()" (click)="selected.emit()">
      <cs-icon class="cs-map-notification__icon" [name]="icon()" [size]="16" aria-hidden="true" />
      <span class="cs-map-notification__body">
        <span class="cs-map-notification__title-row">
          <strong class="cs-map-notification__event">{{ eventLabel() }}</strong>
          @if (unread()) {
            <span class="cs-map-notification__new">{{ newLabel() }}</span>
          }
        </span>
        <span class="cs-map-notification__unit">{{ unitLine() }}</span>
        <span class="cs-map-notification__meta">
          <time [attr.datetime]="isoTime()">{{ relativeTime() }}</time>
          @if (count() > 1) {
            <span aria-hidden="true">·</span><span>{{ count() }} avisos</span>
          }
        </span>
      </span>
    </button>
    <button type="button" class="cs-map-notification__dismiss" [attr.aria-label]="resolvedDismissLabel()" (click)="dismissed.emit()">
      <cs-icon name="x" [size]="14" aria-hidden="true" />
    </button>
    <div class="cs-map-notification__actions"><ng-content /></div>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: grid;
        border: var(--layout-border-thin) solid var(--color-border-divider);
        border-radius: var(--radius-md);
        background: var(--elevation-surface-default);
        font-family: var(--font-family-content);
        transition:
          border-color var(--motion-duration-fast) var(--motion-easing-default),
          box-shadow var(--motion-duration-fast) var(--motion-easing-default);
      }
      :host(:has(.cs-map-notification__main:hover)) {
        border-color: var(--color-border-brand-default);
        box-shadow: var(--shadow-sm);
      }
      button { font: inherit; }
      button:focus-visible {
        outline: var(--layout-border-thick) solid var(--color-border-focused);
        outline-offset: 2px;
      }
      .cs-map-notification__main {
        display: grid;
        grid-template-columns: 16px minmax(0, 1fr);
        align-items: start;
        gap: var(--layout-gap-md);
        /* A la derecha deja lugar para la X, que va encima. */
        padding: var(--layout-padding-lg) calc(var(--layout-padding-lg) + 24px + var(--layout-gap-sm)) var(--layout-padding-lg) var(--layout-padding-lg);
        border: 0;
        border-radius: var(--radius-md);
        background: transparent;
        color: var(--color-text-base-default);
        text-align: start;
        cursor: pointer;
      }
      :host(:has(.cs-map-notification__actions:not(:empty))) .cs-map-notification__main {
        padding-block-end: var(--layout-padding-sm);
        border-radius: var(--radius-md) var(--radius-md) 0 0;
      }
      .cs-map-notification__icon {
        margin-block-start: 2px;
        color: var(--color-text-brand-default);
      }
      .cs-map-notification__body {
        display: grid;
        min-inline-size: 0;
        gap: var(--layout-gap-2xs);
      }
      .cs-map-notification__title-row {
        display: flex;
        align-items: center;
        gap: var(--layout-gap-sm);
        min-inline-size: 0;
      }
      .cs-map-notification__event {
        overflow: hidden;
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
        font-weight: var(--font-weight-bold);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cs-map-notification__new {
        flex-shrink: 0;
        padding: 1px var(--layout-padding-xs);
        border-radius: var(--radius-full);
        background: var(--color-background-selected);
        color: var(--color-text-selected);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
        font-weight: var(--font-weight-accent);
      }
      .cs-map-notification__unit,
      .cs-map-notification__meta {
        color: var(--color-text-base-subtle);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
      .cs-map-notification__unit {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cs-map-notification__meta {
        display: flex;
        gap: var(--layout-gap-xs);
      }
      .cs-map-notification__actions {
        display: flex;
        align-items: center;
        gap: var(--layout-gap-md);
        padding: 0 var(--layout-padding-lg) var(--layout-padding-sm) calc(var(--layout-padding-lg) + 16px + var(--layout-gap-md));
      }
      .cs-map-notification__actions:empty { display: none; }
      .cs-map-notification__dismiss {
        position: absolute;
        inset-block-start: calc(var(--layout-padding-lg) - var(--layout-padding-2xs));
        inset-inline-end: calc(var(--layout-padding-lg) - var(--layout-padding-2xs));
        display: grid;
        place-items: center;
        inline-size: 24px;
        block-size: 24px;
        padding: 0;
        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-base-subtlest);
        cursor: pointer;
      }
      .cs-map-notification__dismiss:hover {
        background: var(--color-background-neutral-subtle);
        color: var(--color-text-base-default);
      }
      @media (prefers-reduced-motion: reduce) {
        :host { transition: none; }
      }
    `,
  ],
})
export class MapNotification {
  /** Qué pasó: «Retomó movimiento». */
  readonly eventLabel = input.required<string>();
  /** Nombre de la unidad: «Camión Norte 04». */
  readonly unitName = input.required<string>();
  /** Código o placa, después del nombre: «ABC-123». */
  readonly unitCode = input('');
  /** Cuándo ocurrió el último aviso del grupo. */
  readonly time = input.required<DateInput>();
  /**
   * Momento de referencia para «Hace N min». La pantalla lo refresca cada
   * 30 segundos o así; sin él, el tiempo relativo no avanza solo.
   */
  readonly now = input<DateInput>(Date.now());
  /** Avisos agrupados; desde 2 muestra «N avisos». */
  readonly count = input(1);
  /** Aún no visto: muestra la marca «Nueva». */
  readonly unread = input(false);
  readonly icon = input<IconName>('bell-ring');
  readonly newLabel = input('Nueva');
  /** Nombre accesible del clic principal. Por defecto, «Centrar en mapa: evento, unidad». */
  readonly selectLabel = input('');
  /** Nombre accesible de la X. Por defecto, «Descartar notificación de unidad». */
  readonly dismissLabel = input('');

  /** Clic en la tarjeta: centrar la unidad en el mapa. */
  readonly selected = output<void>();
  /** Clic en la X: descartar el aviso. */
  readonly dismissed = output<void>();

  protected readonly unitLine = computed(() => [this.unitName(), this.unitCode()].filter(Boolean).join(' · '));
  protected readonly relativeTime = computed(() => formatRelativeTime(this.time(), this.now()));
  protected readonly isoTime = computed(() => toDate(this.time())?.toISOString() ?? null);
  protected readonly resolvedSelectLabel = computed(() => this.selectLabel() || `Centrar en mapa: ${this.eventLabel()}, ${this.unitName()}`);
  protected readonly resolvedDismissLabel = computed(() => this.dismissLabel() || `Descartar notificación de ${this.unitName()}`);
}
