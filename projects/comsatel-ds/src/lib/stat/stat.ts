import { Component, Input } from '@angular/core';

export type StatSize = 'lg' | 'sm';
/** Qué dirección de la variación es buena: define si se pinta en verde o en rojo. */
export type StatTrend = 'up-is-good' | 'down-is-good' | 'neutral';

/**
 * Indicador de un tablero: etiqueta, cifra y una línea de contexto con la
 * variación frente al periodo anterior. El color de la variación depende de
 * `trend`: en «Requieren revisión» subir es malo, así que se pinta en rojo.
 * `lg` para las cifras principales y `sm` para bandas de monitoreo.
 */
@Component({
  selector: 'cs-stat',
  template: `
    <div class="cs-stat" [class.cs-stat--sm]="size === 'sm'">
      <span class="cs-stat__label">{{ label }}</span>
      <strong class="cs-stat__value">{{ value }}</strong>
      @if (caption || delta !== null) {
        <span class="cs-stat__caption">
          @if (delta !== null) {
            <span class="cs-stat__delta" [attr.data-tone]="deltaTone">{{ deltaText }}</span>
          }
          {{ caption }}
        </span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-inline-size: 0;
      }
      .cs-stat {
        display: grid;
        align-content: start;
        gap: var(--layout-gap-2xs);
        box-sizing: border-box;
        block-size: 100%;
        min-block-size: calc(var(--layout-size-lg) * 2);
        padding: var(--layout-padding-lg) var(--layout-padding-xl);
        border: var(--layout-border-thin) solid var(--color-border-neutral-subtle);
        border-radius: var(--radius-md);
        background: var(--elevation-surface-default);
        font-family: var(--font-family-content);
      }
      .cs-stat__label {
        color: var(--color-text-base-subtle);
        font-size: var(--font-size-content-note);
        font-weight: var(--font-weight-accent);
        line-height: var(--font-line-height-content-note);
      }
      .cs-stat__value {
        color: var(--color-text-base-default);
        font-size: var(--font-size-heading-medium);
        font-weight: var(--font-weight-emphasis);
        line-height: var(--font-line-height-heading-medium);
      }
      .cs-stat__caption {
        overflow: hidden;
        color: var(--color-text-base-subtle);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cs-stat__delta {
        font-weight: var(--font-weight-emphasis);
      }
      .cs-stat__delta[data-tone='good'] {
        color: var(--color-text-success-default);
      }
      .cs-stat__delta[data-tone='bad'] {
        color: var(--color-text-danger-default);
      }
      .cs-stat__delta[data-tone='neutral'] {
        color: var(--color-text-base-default);
      }
      .cs-stat--sm {
        min-block-size: calc(var(--layout-size-2xs) * 3.625);
        padding: var(--layout-padding-sm) var(--layout-padding-lg);
      }
      .cs-stat--sm .cs-stat__value {
        font-size: var(--font-size-content-highlight);
        line-height: var(--font-line-height-content-highlight);
      }
    `,
  ],
})
export class Stat {
  @Input({ required: true }) label = '';
  @Input({ required: true }) value: string | number = '';
  /** Contexto de la cifra: «vs. hace una semana · Pendientes y observadas». */
  @Input() caption = '';
  /** Variación frente al periodo anterior; null para no mostrarla. */
  @Input() delta: number | null = null;
  /** Qué dirección de la variación es buena. Sin cambio (0) siempre es neutra. */
  @Input() trend: StatTrend = 'up-is-good';
  @Input() size: StatSize = 'lg';

  protected get deltaText(): string {
    const delta = this.delta ?? 0;
    return `${delta > 0 ? '+' : ''}${delta}`;
  }

  protected get deltaTone(): 'good' | 'bad' | 'neutral' {
    const delta = this.delta ?? 0;
    if (delta === 0 || this.trend === 'neutral') return 'neutral';
    const up = delta > 0;
    return (this.trend === 'up-is-good') === up ? 'good' : 'bad';
  }
}
