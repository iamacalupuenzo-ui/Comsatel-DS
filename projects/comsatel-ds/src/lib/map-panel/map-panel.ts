import { Component, DestroyRef, ElementRef, afterRenderEffect, computed, inject, input, model, signal, viewChild } from '@angular/core';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';

let nextMapPanelId = 0;

/**
 * Panel flotante del mapa: la superficie que comparten el buscador de
 * unidades y las notificaciones. Abierto muestra su contenido con scroll
 * propio; contraído queda en una píldora de 48 px con el encabezado.
 *
 * - La posición la da la pantalla: el host se ubica con `position:absolute`
 *   y `top`/`bottom`; el panel crece con su contenido hasta ese alto.
 * - Encabezado: `title`, `icon` y `badge`, o el contenido `[csMapPanelHeader]`
 *   cuando el encabezado es un campo (el buscador).
 * - Acciones del encabezado: `[csMapPanelActions]`, antes del botón de plegar.
 * - Barra fija arriba del scroll: `[csMapPanelToolbar]` (filtros).
 * - Pie fijo: `[csMapPanelFooter]` («Limpiar notificaciones»).
 *
 * Contraído, el cuerpo queda `inert` para que el teclado no entre a
 * contenido invisible. Escape lo contrae y devuelve el foco al botón.
 */
@Component({
  selector: 'cs-map-panel',
  imports: [Icon],
  host: {
    class: 'cs-map-panel',
    '[class.cs-map-panel--open]': 'open()',
  },
  template: `
    <section
      class="cs-map-panel__surface"
      [class.cs-map-panel__surface--collapsed]="!open()"
      [attr.aria-label]="label()"
      (keydown.escape)="onEscape($event)"
      (transitionend)="checkScroll()"
    >
      <div class="cs-map-panel__header">
        <div class="cs-map-panel__identity">
          <ng-content select="[csMapPanelHeader]" />
          @if (title()) {
            @if (icon(); as name) {
              <cs-icon class="cs-map-panel__icon" [name]="name" [size]="16" aria-hidden="true" />
            }
            <span class="cs-map-panel__title">{{ title() }}</span>
          }
          @if (badgeText()) {
            <span class="cs-map-panel__badge" [id]="badgeId">
              <span aria-hidden="true">{{ badgeText() }}</span>
              @if (badgeDescription()) {
                <span class="cs-map-panel__sr-only">{{ badgeDescription() }}</span>
              }
            </span>
          }
        </div>
        <div class="cs-map-panel__actions">
          <ng-content select="[csMapPanelActions]" />
          <span class="cs-map-panel__separator" aria-hidden="true"></span>
          <button
            #toggleButton
            type="button"
            class="cs-map-panel__icon-button cs-map-panel__toggle"
            [attr.aria-expanded]="open()"
            [attr.aria-controls]="bodyId"
            [attr.aria-label]="open() ? resolvedCollapseLabel() : resolvedExpandLabel()"
            [attr.aria-describedby]="badgeText() && badgeDescription() ? badgeId : null"
            (click)="toggle()"
          >
            <cs-icon name="chevron-down" [size]="16" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div class="cs-map-panel__body" [id]="bodyId" [attr.inert]="open() ? null : ''" [attr.aria-hidden]="open() ? null : 'true'">
        <div class="cs-map-panel__toolbar"><ng-content select="[csMapPanelToolbar]" /></div>
        <div class="cs-map-panel__viewport">
          <div
            #scroller
            class="cs-map-panel__scroller"
            [attr.role]="listLabel() ? 'list' : null"
            [attr.aria-label]="listLabel() || null"
            (scroll)="checkScroll()"
          >
            <div #content class="cs-map-panel__content"><ng-content /></div>
          </div>
          @if (showScrollHint()) {
            <div class="cs-map-panel__scroll-hint" aria-hidden="true">
              <cs-icon name="chevron-down" [size]="16" class="cs-map-panel__scroll-chevron" />
            </div>
          }
        </div>
        <div class="cs-map-panel__footer"><ng-content select="[csMapPanelFooter]" /></div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        --cs-map-panel-header-size: 48px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        inline-size: 306px;
        max-inline-size: 100%;
        min-block-size: 0;
        overflow: hidden;
        /* El host puede ser más alto que el panel: solo el panel recibe clics. */
        pointer-events: none;
        interpolate-size: allow-keywords;
      }
      button { font: inherit; }
      .cs-map-panel__surface {
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        block-size: auto;
        max-block-size: 100%;
        overflow: hidden;
        border: var(--layout-border-thin) solid var(--color-border-neutral-subtle);
        border-radius: var(--radius-md);
        background: var(--color-background-canvas);
        box-shadow: var(--shadow-lg);
        font-family: var(--font-family-content);
        transition:
          block-size var(--motion-duration-medium) var(--motion-easing-default),
          border-radius var(--motion-duration-medium) var(--motion-easing-default);
      }
      .cs-map-panel__surface--collapsed {
        block-size: calc(var(--cs-map-panel-header-size) + 2 * var(--layout-border-thin));
        border-radius: calc((var(--cs-map-panel-header-size) + 2 * var(--layout-border-thin)) / 2);
      }
      .cs-map-panel__surface button:focus-visible {
        outline: var(--layout-border-thick) solid var(--color-border-focused);
        outline-offset: 2px;
      }
      .cs-map-panel__header {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: space-between;
        gap: var(--layout-gap-md);
        box-sizing: border-box;
        block-size: var(--cs-map-panel-header-size);
        padding-inline: var(--layout-padding-lg);
        color: var(--color-text-base-subtlest);
        box-shadow: inset 0 calc(var(--layout-border-thin) * -1) 0 var(--color-border-divider);
        transition: box-shadow var(--motion-duration-medium) var(--motion-easing-default);
      }
      .cs-map-panel__surface--collapsed .cs-map-panel__header {
        box-shadow: inset 0 calc(var(--layout-border-thin) * -1) 0 transparent;
      }
      .cs-map-panel__identity {
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        gap: var(--layout-gap-md);
        min-inline-size: 0;
      }
      .cs-map-panel__title {
        overflow: hidden;
        color: var(--color-text-base-default);
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
        font-weight: var(--font-weight-accent);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cs-map-panel__badge {
        display: inline-grid;
        flex-shrink: 0;
        place-items: center;
        box-sizing: border-box;
        min-inline-size: 20px;
        block-size: 20px;
        padding-inline: var(--layout-padding-xs);
        border-radius: var(--radius-full);
        background: var(--color-background-danger-default);
        color: var(--color-text-inverse);
        font-size: var(--font-size-content-note);
        font-weight: var(--font-weight-bold);
        line-height: 1;
      }
      .cs-map-panel__actions {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: var(--layout-gap-md);
      }
      .cs-map-panel__icon-button {
        display: grid;
        place-items: center;
        min-inline-size: 24px;
        min-block-size: 24px;
        padding: var(--layout-padding-2xs);
        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-base-subtlest);
        cursor: pointer;
      }
      .cs-map-panel__icon-button:hover {
        background: var(--color-background-neutral-subtle);
        color: var(--color-text-base-default);
      }
      .cs-map-panel__toggle cs-icon {
        display: block;
        transition: transform var(--motion-duration-medium) var(--motion-easing-default);
      }
      .cs-map-panel__toggle[aria-expanded='true'] cs-icon { transform: rotate(180deg); }
      .cs-map-panel__separator {
        inline-size: var(--layout-border-thin);
        block-size: 16px;
        background: var(--color-border-divider);
      }
      .cs-map-panel__body {
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        min-block-size: 0;
        overflow: hidden;
      }
      .cs-map-panel__toolbar {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: var(--layout-gap-xs);
        min-inline-size: 0;
        padding: var(--layout-padding-sm);
        border-block-end: var(--layout-border-thin) solid var(--color-border-divider);
      }
      .cs-map-panel__toolbar:empty,
      .cs-map-panel__footer:empty { display: none; }
      .cs-map-panel__viewport {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;
        min-block-size: 0;
      }
      /* Sin barra de scroll visible: la pista del chevrón avisa que hay más. */
      .cs-map-panel__scroller {
        flex: 1 1 auto;
        min-block-size: 0;
        overflow-y: auto;
        padding: var(--layout-padding-sm);
        scrollbar-width: none;
      }
      .cs-map-panel__scroller::-webkit-scrollbar { display: none; }
      .cs-map-panel__content {
        display: grid;
        grid-auto-rows: max-content;
        gap: var(--layout-gap-sm);
      }
      .cs-map-panel__scroll-hint {
        position: absolute;
        inset-inline: 0;
        inset-block-end: 0;
        display: flex;
        justify-content: center;
        padding-block: var(--layout-padding-lg) var(--layout-padding-xs);
        pointer-events: none;
        background: linear-gradient(to bottom, transparent, var(--color-background-canvas) 55%);
      }
      .cs-map-panel__scroll-chevron {
        color: var(--color-text-base-subtlest);
        animation: cs-map-panel-hint 0.9s ease-in-out infinite;
      }
      @keyframes cs-map-panel-hint {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(5px); }
      }
      /* 40 px de alto: la acción del pie es fácil de tocar aunque sea un enlace. */
      .cs-map-panel__footer {
        display: grid;
        flex-shrink: 0;
        align-content: center;
        min-block-size: 40px;
        box-shadow: inset 0 var(--layout-border-thin) 0 var(--color-border-divider);
      }
      .cs-map-panel__sr-only {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
      }
      /* En pantallas táctiles chicas, los botones del encabezado llegan a 40 px. */
      @media (max-width: 767px) {
        .cs-map-panel__icon-button { min-inline-size: 40px; min-block-size: 40px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .cs-map-panel__surface,
        .cs-map-panel__header,
        .cs-map-panel__toggle cs-icon { transition: none; }
        .cs-map-panel__scroll-chevron { animation: none; }
      }
    `,
  ],
})
export class MapPanel {
  /** Nombre accesible del panel: «Notificaciones de unidades». */
  readonly label = input.required<string>();
  /** Título visible del encabezado. Vacío cuando el encabezado es `[csMapPanelHeader]`. */
  readonly title = input('');
  /** Ícono antes del título. */
  readonly icon = input<IconName | undefined>(undefined);
  /** Contador rojo junto al título; 0 o null lo ocultan y desde 100 muestra «99+». */
  readonly badge = input<number | null>(null);
  /** Lectura del contador para lectores de pantalla: «3 notificaciones pendientes». */
  readonly badgeDescription = input('');
  /** Si el contenido es una lista, su nombre accesible: el scroll toma `role="list"`. */
  readonly listLabel = input('');
  /** Etiquetas del botón de plegar. Por defecto, «Expandir» o «Contraer» más el título. */
  readonly expandLabel = input('');
  readonly collapseLabel = input('');
  /** Abierto o contraído. Admite `[(open)]`. */
  readonly open = model(true);

  private readonly id = ++nextMapPanelId;
  protected readonly bodyId = `cs-map-panel-${this.id}-body`;
  protected readonly badgeId = `cs-map-panel-${this.id}-badge`;
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggleButton');
  private readonly scroller = viewChild.required<ElementRef<HTMLElement>>('scroller');
  private readonly content = viewChild.required<ElementRef<HTMLElement>>('content');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly showScrollHint = signal(false);
  protected readonly badgeText = computed(() => {
    const count = this.badge();
    if (!count || count < 1) return '';
    return count > 99 ? '99+' : String(count);
  });
  private readonly subject = computed(() => {
    const text = this.title() || this.label();
    return text.charAt(0).toLowerCase() + text.slice(1);
  });
  protected readonly resolvedExpandLabel = computed(() => this.expandLabel() || `Expandir ${this.subject()}`);
  protected readonly resolvedCollapseLabel = computed(() => this.collapseLabel() || `Contraer ${this.subject()}`);

  constructor() {
    // El contenido cambia de alto (llegan avisos, se filtran unidades): la pista se recalcula.
    const observer = new ResizeObserver(() => this.checkScroll());
    inject(DestroyRef).onDestroy(() => observer.disconnect());
    afterRenderEffect(() => {
      this.open();
      observer.observe(this.scroller().nativeElement);
      observer.observe(this.content().nativeElement);
      this.checkScroll();
    });
  }

  /** Abre el panel. */
  expand(): void {
    this.open.set(true);
  }

  /** Contrae el panel; si el foco estaba adentro, vuelve al botón de plegar. */
  collapse(): void {
    const body = this.host.nativeElement.querySelector(`#${this.bodyId}`);
    if (body?.contains(document.activeElement)) this.toggleButton().nativeElement.focus();
    this.open.set(false);
  }

  protected toggle(): void {
    if (this.open()) this.collapse();
    else this.expand();
  }

  // Si un selector o menú de adentro ya usó el Escape para cerrarse (preventDefault), el panel sigue abierto:
  // cada Escape cierra una sola capa.
  protected onEscape(event: Event): void {
    if (!this.open() || event.defaultPrevented) return;
    event.preventDefault();
    this.collapse();
    this.toggleButton().nativeElement.focus();
  }

  protected checkScroll(): void {
    const el = this.scroller().nativeElement;
    this.showScrollHint.set(
      this.open() && el.scrollHeight > el.clientHeight + 4 && el.scrollTop + el.clientHeight < el.scrollHeight - 10,
    );
  }
}
