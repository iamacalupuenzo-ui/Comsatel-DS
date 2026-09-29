import { Component, Input } from '@angular/core';

/**
 * Línea de tiempo vertical para el historial de un registro: cada paso con
 * su acción, fecha y detalle, unidos por una línea, y el paso actual
 * resaltado. Se aplica sobre un `<ol>` nativo (`<ol csTimeline>`) y cada
 * paso es un `<li csTimelineItem>`, para conservar la semántica de lista
 * ordenada que leen los lectores de pantalla.
 */
@Component({
  selector: 'ol[csTimeline]',
  template: `<ng-content />`,
  host: { class: 'cs-timeline' },
  styles: [
    `
      :host {
        display: grid;
        margin: 0;
        padding: 0;
        list-style: none;
      }
    `,
  ],
})
export class Timeline {}

@Component({
  selector: 'li[csTimelineItem]',
  template: `
    <span class="cs-timeline-item__marker" aria-hidden="true"></span>
    <div class="cs-timeline-item__entry">
      <div class="cs-timeline-item__heading">
        <strong class="cs-timeline-item__title">{{ title }}</strong>
        @if (time) {
          <time class="cs-timeline-item__time" [attr.datetime]="dateTime || null">{{ time }}</time>
        }
      </div>
      @if (description) {
        <span class="cs-timeline-item__description">{{ description }}</span>
      }
      <ng-content />
    </div>
  `,
  host: {
    class: 'cs-timeline-item',
    '[class.cs-timeline-item--current]': 'current',
    '[attr.aria-current]': "current ? 'step' : null",
  },
  styles: [
    `
      :host {
        position: relative;
        display: grid;
        grid-template-columns: var(--layout-padding-xl) minmax(0, 1fr);
        column-gap: var(--layout-gap-md);
      }
      /* Línea que une cada paso con el siguiente. */
      :host(:not(:last-child))::before {
        position: absolute;
        top: var(--layout-padding-lg);
        bottom: calc(var(--layout-padding-lg) * -1);
        left: calc(var(--layout-padding-sm) - var(--layout-border-thin));
        width: var(--layout-border-thin);
        background: var(--color-border-divider);
        content: '';
      }
      .cs-timeline-item__marker {
        z-index: 1;
        align-self: start;
        box-sizing: border-box;
        display: block;
        width: var(--layout-padding-lg);
        height: var(--layout-padding-lg);
        margin-top: var(--layout-padding-2xs);
        border: var(--layout-border-thick) solid var(--color-border-neutral-default);
        border-radius: var(--radius-full);
        background: var(--elevation-surface-default);
      }
      :host(.cs-timeline-item--current) .cs-timeline-item__marker {
        border-color: var(--color-border-brand-default);
        background: var(--color-background-brand-default);
      }
      .cs-timeline-item__entry {
        display: grid;
        gap: var(--layout-gap-xs);
        padding-bottom: var(--layout-padding-xl);
      }
      :host(:last-child) .cs-timeline-item__entry {
        padding-bottom: 0;
      }
      .cs-timeline-item__heading {
        display: flex;
        align-items: baseline;
        flex-wrap: wrap;
        gap: var(--layout-gap-sm);
      }
      .cs-timeline-item__title {
        color: var(--color-text-base-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
        font-weight: var(--font-weight-bold);
      }
      .cs-timeline-item__time,
      .cs-timeline-item__description {
        color: var(--color-text-base-subtle);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
    `,
  ],
})
export class TimelineItem {
  /** Qué pasó: «Registrada», «Observada». */
  @Input({ required: true }) title = '';
  /** Fecha y hora legibles: «27 sep. 2026, 10:42». */
  @Input() time = '';
  /** Fecha en formato máquina (ISO) para el atributo datetime de time. */
  @Input() dateTime = '';
  /** Detalle del paso: quién lo hizo o por qué. */
  @Input() description = '';
  /** Paso actual: marcador de color de marca y aria-current="step". */
  @Input() current = false;
}
