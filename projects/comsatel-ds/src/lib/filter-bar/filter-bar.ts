import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { Button } from '../button/button';
import { Icon } from '../icons/icon';
import { InputGroup } from '../input/input-group';
import { InputGroupAddon } from '../input/input-group-addon';
import { InputGroupClear } from '../input/input-group-clear';
import { InputGroupInput } from '../input/input-group-input';
import { Popover } from '../popover/popover';

let filterBarId = 0;

/**
 * Barra de filtros de una pantalla de datos: búsqueda opcional, los filtros
 * principales proyectados, «Más filtros» con contador y panel, y «Limpiar
 * filtros» solo cuando hay algún criterio aplicado. Es controlada: no guarda
 * valores de filtro, solo si su panel está abierto.
 *
 * - Filtros principales: contenido por defecto (`cs-input-dropdown`,
 *   `cs-date-range-picker`, etc., cada uno con su propio label).
 * - Filtros secundarios: contenido con el atributo `moreFilters`; aparece el
 *   botón «Más filtros» solo si `hasMoreFilters` es true.
 */
@Component({
  selector: 'cs-filter-bar',
  imports: [Button, Icon, InputGroup, InputGroupAddon, InputGroupClear, InputGroupInput, Popover],
  template: `
    <div class="cs-filter-bar" role="group" [attr.aria-label]="ariaLabel || null">
      @if (searchLabel) {
        <div class="cs-filter-bar__search">
          <label class="cs-filter-bar__label" [attr.for]="searchId">{{ searchLabel }}</label>
          <cs-input-group>
            <cs-input-group-addon>
              <cs-icon name="search" [size]="16" class="cs-filter-bar__search-icon" aria-hidden="true" />
            </cs-input-group-addon>
            <cs-input-group-input
              [id]="searchId"
              fieldSize="md"
              type="text"
              [placeholder]="searchPlaceholder"
              [value]="searchValue"
              (valueChange)="searchChange.emit($event)"
            />
            <!-- La X del DS, no la del navegador: type="search" dibuja una distinta en cada navegador. -->
            <cs-input-group-clear [label]="clearSearchLabel" (cleared)="searchChange.emit('')" />
          </cs-input-group>
        </div>
      }
      <ng-content />
      @if (hasMoreFilters) {
        <span #moreTrigger class="cs-filter-bar__more">
          <button
            type="button"
            class="cs-filter-bar__more-trigger"
            [class.cs-filter-bar__more-trigger--open]="moreOpen()"
            [class.cs-filter-bar__more-trigger--active]="moreFiltersCount > 0"
            aria-haspopup="dialog"
            [attr.aria-expanded]="moreOpen()"
            [attr.aria-controls]="panelId"
            (click)="moreOpen.set(!moreOpen())"
          >
            <cs-icon name="sliders" [size]="16" aria-hidden="true" />
            <span>{{ moreFiltersLabel }}{{ moreFiltersCount ? ' (' + moreFiltersCount + ')' : '' }}</span>
          </button>
        </span>
        <cs-popover
          [isOpen]="moreOpen()"
          [triggerRef]="moreTrigger"
          placement="bottom-end"
          [offset]="4"
          role="dialog"
          [ariaLabel]="moreFiltersLabel"
          [bare]="true"
          [closeOnOverlayClick]="false"
          (closed)="moreOpen.set(false)"
        >
          <div class="cs-filter-bar__panel" [id]="panelId">
            <ng-content select="[moreFilters]" />
          </div>
        </cs-popover>
      }
      @if (hasActiveFilters) {
        <cs-button variant="tertiary" size="sm" (click)="clear.emit()">
          <cs-icon name="x" [size]="16" aria-hidden="true" />{{ clearLabel }}
        </cs-button>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .cs-filter-bar {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: var(--layout-gap-md);
      }
      .cs-filter-bar__search {
        display: grid;
        flex: 1 1 calc(var(--layout-size-3xl) * 3);
        gap: var(--layout-gap-xs);
        min-inline-size: calc(var(--layout-size-3xl) * 2.75);
        max-inline-size: calc(var(--layout-size-3xl) * 6);
      }
      .cs-filter-bar__label {
        color: var(--color-text-base-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
        font-weight: var(--font-weight-accent);
      }
      .cs-filter-bar__search-icon {
        color: var(--color-text-base-subtlest);
      }
      .cs-filter-bar__more {
        display: inline-flex;
      }
      /* Mismo alto, borde y estado activo que Input dropdown md. */
      .cs-filter-bar__more-trigger {
        display: inline-flex;
        align-items: center;
        gap: var(--layout-gap-xs);
        block-size: var(--layout-size-base);
        padding-inline: calc(var(--layout-padding-md) + var(--layout-border-thick));
        border: var(--layout-border-thin) solid var(--color-border-neutral-default);
        border-radius: var(--radius-sm);
        background-color: var(--elevation-surface-default);
        color: var(--color-text-base-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
        font-weight: var(--font-weight-regular);
        letter-spacing: var(--font-letter-spacing-content);
        white-space: nowrap;
        cursor: pointer;
        transition: border-color var(--motion-duration-fast) var(--motion-easing-default);
      }
      .cs-filter-bar__more-trigger:hover:not(.cs-filter-bar__more-trigger--open):not(.cs-filter-bar__more-trigger--active) {
        border-color: var(--color-border-neutral-bolder);
      }
      .cs-filter-bar__more-trigger--active {
        border-color: var(--color-border-selected);
        background-color: var(--color-background-selected);
        color: var(--color-text-selected);
        font-weight: var(--font-weight-accent);
      }
      .cs-filter-bar__more-trigger:focus-visible,
      .cs-filter-bar__more-trigger--open {
        outline: none;
        border-color: var(--color-border-brand-default);
        box-shadow: 0 0 0 var(--layout-border-thick) var(--color-border-brand-subtle);
      }
      /* Panel blanco con campos a todo el ancho. */
      .cs-filter-bar__panel {
        --elevation-surface-default: var(--color-background-base);
        box-sizing: border-box;
        display: grid;
        inline-size: calc(var(--layout-size-3xl) * 3);
        max-inline-size: calc(100vw - var(--layout-padding-2xl));
        gap: var(--layout-gap-lg);
        padding: var(--layout-padding-lg);
        border: var(--layout-border-thin) solid var(--color-border-neutral-subtle);
        border-radius: var(--radius-lg);
        background-color: var(--color-background-base);
        box-shadow: var(--shadow-xl);
      }
      @media (max-width: 767px) {
        .cs-filter-bar {
          flex-direction: column;
          align-items: stretch;
        }
        .cs-filter-bar__search {
          flex-basis: auto;
          max-inline-size: none;
          min-inline-size: 0;
        }
      }
    `,
  ],
})
export class FilterBar {
  /** Nombre del grupo para lectores de pantalla, por ejemplo «Filtros de capturas». */
  @Input() ariaLabel = '';
  /** Label visible de la búsqueda. Vacío para no mostrar búsqueda. */
  @Input() searchLabel = '';
  @Input() searchPlaceholder = '';
  @Input() searchValue = '';
  @Input() searchId = `cs-filter-bar-search-${++filterBarId}`;
  /** Nombre accesible del botón que limpia la búsqueda. */
  @Input() clearSearchLabel = 'Limpiar búsqueda';
  @Output() readonly searchChange = new EventEmitter<string>();

  /** Muestra «Más filtros» con el contenido marcado con `moreFilters`. */
  @Input() hasMoreFilters = false;
  @Input() moreFiltersLabel = 'Más filtros';
  /** Filtros secundarios aplicados; se muestra entre paréntesis y activa el botón. */
  @Input() moreFiltersCount = 0;

  /** Hay algún criterio aplicado: muestra «Limpiar filtros». */
  @Input() hasActiveFilters = false;
  @Input() clearLabel = 'Limpiar filtros';
  @Output() readonly clear = new EventEmitter<void>();

  protected readonly moreOpen = signal(false);
  protected readonly panelId = `cs-filter-bar-panel-${filterBarId}`;

  constructor(private readonly el: ElementRef<HTMLElement>) {}

  /**
   * El panel no usa el cierre por clic afuera de Popover porque los campos
   * de adentro abren sus propios popovers (menús, calendarios) portados a
   * document.body: un clic en ellos no debe cerrar el panel.
   */
  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.moreOpen()) return;
    const target = event.target as HTMLElement | null;
    if (!target) return;
    if (target.closest('.cs-filter-bar__more') && this.el.nativeElement.contains(target)) return;
    if (target.closest('cs-popover')) return;
    this.moreOpen.set(false);
  }
}
