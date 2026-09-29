import { Component, ElementRef, inject, input, model, output, signal } from '@angular/core';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';

/** Una pestaña del mapa: el mapa mismo, un grupo de seguimiento, una bitácora… */
export interface MapTab {
  id: string;
  /** Texto visible. */
  label: string;
  icon?: IconName;
  /** Contador entre paréntesis después del nombre, como las unidades de un grupo. */
  count?: number;
  /** Muestra la X. La pantalla decide si pide confirmación antes de cerrar. */
  closable?: boolean;
  /** Se puede renombrar con doble clic, F2 o el lápiz de la pestaña activa. */
  renamable?: boolean;
  /** Lectura para lectores de pantalla cuando el texto visible no basta: «Bitácora de ABC-123». */
  description?: string;
  /**
   * Id del contenedor de la vista (`role="tabpanel"`) que muestra esta pestaña; se enlaza con
   * `aria-controls`. El panel se nombra con `aria-labelledby` apuntando a `mapTabId(id)`.
   */
  panelId?: string;
}

/** Id del botón de una pestaña, para el `aria-labelledby` de su panel. */
export function mapTabId(id: string): string {
  return `cs-map-tab-${id.replace(/[^A-Za-z0-9_-]/g, '-')}`;
}

export interface MapTabRename {
  id: string;
  label: string;
}

/**
 * Pestañas de las vistas abiertas sobre el mapa: la del mapa fijo al inicio
 * y luego grupos de seguimiento, bitácoras o recuperos, cada uno cerrable.
 * Se renombran como una hoja de cálculo: doble clic, F2 o el lápiz.
 *
 * Es controlada: `tabs` y `active` vienen de la pantalla; cerrar emite
 * `closeRequest` (la pestaña no desaparece sola, por si hay que confirmar)
 * y renombrar emite `renamed`. Con una sola pestaña no aporta: la pantalla
 * puede no mostrarla, como un navegador con una sola pestaña.
 */
@Component({
  selector: 'cs-map-tabs',
  imports: [Icon],
  host: { class: 'cs-map-tabs' },
  template: `
    <div class="cs-map-tabs__list" role="tablist" [attr.aria-label]="label()" (keydown)="onKeydown($event)">
      @for (tab of tabs(); track tab.id) {
        <span class="cs-map-tabs__tab" role="presentation" [class.cs-map-tabs__tab--active]="active() === tab.id">
          @if (editingId() === tab.id) {
            <span class="cs-map-tabs__label cs-map-tabs__label--editing">
              @if (tab.icon) {
                <cs-icon [name]="tab.icon" [size]="16" aria-hidden="true" />
              }
              <input
                class="cs-map-tabs__rename-input"
                type="text"
                [attr.aria-label]="renameInputLabel()"
                [attr.maxlength]="maxNameLength()"
                [value]="editingName()"
                [style.width.ch]="editingName().length + 1"
                (input)="editingName.set($any($event.target).value)"
                (blur)="commitRename(tab)"
                (keydown.enter)="commitRename(tab, true)"
                (keydown.escape)="cancelRename()"
                (keydown)="$event.stopPropagation()"
              />
              @if (tab.count !== undefined) {
                <span>({{ tab.count }})</span>
              }
            </span>
          } @else {
            <button
              type="button"
              class="cs-map-tabs__label"
              role="tab"
              [attr.data-tab-id]="tab.id"
              [id]="tabId(tab.id)"
              [attr.aria-controls]="tab.panelId || null"
              [attr.aria-selected]="active() === tab.id"
              [attr.tabindex]="active() === tab.id ? 0 : -1"
              [attr.title]="tab.renamable ? tab.label : null"
              [attr.aria-label]="tabLabel(tab)"
              (click)="select(tab.id)"
              (dblclick)="tab.renamable && startRename(tab)"
              (keydown.f2)="tab.renamable && startRename(tab)"
            >
              @if (tab.icon) {
                <cs-icon [name]="tab.icon" [size]="16" aria-hidden="true" />
              }
              <span class="cs-map-tabs__name">{{ tab.label }}</span>
              @if (tab.count !== undefined) {
                <span>({{ tab.count }})</span>
              }
            </button>
            @if (tab.renamable) {
              <!-- Pista visible de que el nombre se cambia: aparece en la pestaña activa al pasar el mouse o enfocarla. -->
              <button type="button" class="cs-map-tabs__rename" [attr.aria-label]="'Renombrar ' + tab.label" title="Renombrar" (click)="startRename(tab)">
                <cs-icon name="pencil" [size]="14" aria-hidden="true" />
              </button>
            }
          }
          @if (tab.closable) {
            <button type="button" class="cs-map-tabs__close" [attr.aria-label]="'Cerrar ' + (tab.description || tab.label)" (click)="closeRequest.emit(tab.id)">
              <cs-icon name="x" [size]="14" aria-hidden="true" />
            </button>
          }
        </span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        box-sizing: border-box;
        max-inline-size: 100%;
        font-family: var(--font-family-content);
      }
      button, input { font: inherit; }
      .cs-map-tabs__list {
        display: flex;
        align-items: stretch;
        inline-size: 100%;
        overflow-x: auto;
        border: var(--layout-border-thin) solid var(--color-border-neutral-subtle);
        border-block-end: 0;
        border-radius: var(--radius-md) var(--radius-md) 0 0;
        background: var(--elevation-surface-default);
        scrollbar-width: thin;
      }
      .cs-map-tabs__tab {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        min-block-size: 36px;
        border-inline-end: var(--layout-border-thin) solid var(--color-border-divider);
        color: var(--color-text-base-default);
      }
      .cs-map-tabs__tab--active {
        background: var(--color-background-brand-subtlest);
        color: var(--color-text-brand-default);
      }
      .cs-map-tabs__label {
        display: flex;
        align-self: stretch;
        align-items: center;
        gap: var(--layout-gap-xs);
        padding-inline: var(--layout-padding-md);
        border: 0;
        background: transparent;
        color: inherit;
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
        font-weight: var(--font-weight-accent);
        white-space: nowrap;
        cursor: pointer;
      }
      .cs-map-tabs__tab:has(.cs-map-tabs__close, .cs-map-tabs__rename) .cs-map-tabs__label {
        padding-inline-end: var(--layout-padding-xs);
      }
      /* Nombres propios largos: se cortan y el completo queda en el title. */
      .cs-map-tabs__name {
        overflow: hidden;
        max-inline-size: 160px;
        text-overflow: ellipsis;
      }
      /* Cerrar y renombrar ocupan todo el alto: área de clic de al menos 24 × 24 px. */
      .cs-map-tabs__close,
      .cs-map-tabs__rename {
        place-items: center;
        align-self: stretch;
        min-inline-size: 24px;
        border: 0;
        background: transparent;
        cursor: pointer;
      }
      .cs-map-tabs__close {
        display: grid;
        padding-inline: var(--layout-padding-xs) var(--layout-padding-sm);
        color: var(--color-text-danger-default);
        opacity: 0.7;
      }
      .cs-map-tabs__close:hover { opacity: 1; }
      .cs-map-tabs__rename {
        display: none;
        padding-inline: var(--layout-padding-xs);
        color: var(--color-text-base-subtle);
        opacity: 0;
        transition: opacity var(--motion-duration-fast) var(--motion-easing-default);
      }
      .cs-map-tabs__tab--active .cs-map-tabs__rename { display: grid; }
      .cs-map-tabs__tab--active:hover .cs-map-tabs__rename,
      .cs-map-tabs__tab--active:focus-within .cs-map-tabs__rename { opacity: 1; }
      .cs-map-tabs__rename:hover { color: var(--color-text-base-default); }
      .cs-map-tabs__list button:focus-visible {
        outline: var(--layout-border-thick) solid var(--color-border-focused);
        outline-offset: -2px;
      }
      /* Al renombrar solo el nombre se vuelve editable; la fila conserva icono y contador. */
      .cs-map-tabs__label--editing { cursor: text; }
      .cs-map-tabs__rename-input {
        min-inline-size: 12px;
        max-inline-size: 160px;
        padding: 0;
        border: 0;
        border-block-end: var(--layout-border-thin) solid currentColor;
        background: transparent;
        color: inherit;
      }
      .cs-map-tabs__rename-input:focus-visible { outline: none; }
      @media (prefers-reduced-motion: reduce) {
        .cs-map-tabs__rename { transition: none; }
      }
    `,
  ],
})
export class MapTabs {
  readonly tabs = input.required<MapTab[]>();
  /** Id de la pestaña activa. Admite `[(active)]`. */
  readonly active = model<string>('');
  /** Nombre accesible del grupo de pestañas. */
  readonly label = input('Vistas abiertas del mapa');
  /** Largo máximo de un nombre propio. */
  readonly maxNameLength = input(30);
  readonly renameInputLabel = input('Nombre de la pestaña');

  /** Clic en la X. La pantalla quita la pestaña (o pide confirmar antes). */
  readonly closeRequest = output<string>();
  /** Nombre nuevo al confirmar con Enter o al salir del campo. Vacío vuelve al nombre por defecto. */
  readonly renamed = output<MapTabRename>();

  protected readonly editingId = signal<string | null>(null);
  protected readonly editingName = signal('');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly tabId = mapTabId;

  protected tabLabel(tab: MapTab): string {
    const parts = [tab.description || tab.label];
    if (tab.count !== undefined) parts.push(`${tab.count} ${tab.count === 1 ? 'unidad' : 'unidades'}`);
    if (tab.renamable) parts.push('F2 o doble clic para renombrar');
    return parts.join(', ');
  }

  protected select(id: string): void {
    this.active.set(id);
  }

  // Flechas, Inicio y Fin mueven el foco entre pestañas y la activan (patrón de pestañas de ARIA).
  protected onKeydown(event: KeyboardEvent): void {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const target = event.target as HTMLElement;
    if (target.getAttribute('role') !== 'tab') return;
    const tabs = this.tabs();
    const index = tabs.findIndex((tab) => tab.id === target.dataset['tabId']);
    if (index < 0) return;
    event.preventDefault();
    const next =
      event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    const id = tabs[next].id;
    this.active.set(id);
    queueMicrotask(() => this.tabButton(id)?.focus());
  }

  protected startRename(tab: MapTab): void {
    this.editingId.set(tab.id);
    this.editingName.set(tab.label);
    // El campo existe recién después de repintar el @if.
    setTimeout(() => {
      const field = this.host.nativeElement.querySelector<HTMLInputElement>('.cs-map-tabs__rename-input');
      field?.focus();
      field?.select();
    });
  }

  /** Enter confirma y devuelve el foco a la pestaña; salir del campo con el mouse solo confirma. */
  protected commitRename(tab: MapTab, returnFocus = false): void {
    if (this.editingId() !== tab.id) return;
    const label = this.editingName().trim().slice(0, this.maxNameLength());
    this.editingId.set(null);
    if (label !== tab.label) this.renamed.emit({ id: tab.id, label });
    if (returnFocus) setTimeout(() => this.tabButton(tab.id)?.focus());
  }

  protected cancelRename(): void {
    const id = this.editingId();
    this.editingId.set(null);
    if (id) setTimeout(() => this.tabButton(id)?.focus());
  }

  private tabButton(id: string): HTMLButtonElement | null {
    return this.host.nativeElement.querySelector<HTMLButtonElement>(`[role="tab"][data-tab-id="${CSS.escape(id)}"]`);
  }
}
