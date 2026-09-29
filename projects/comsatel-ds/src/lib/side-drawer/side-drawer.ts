import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { Button } from '../button/button';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import type { IconName } from '@iamacalupuenzo-ui/comsatel-ds/icons';

export type SideDrawerSurface = 'default' | 'canvas';

export interface SideDrawerAction {
  label: string;
  /** Ícono antes del texto; solo en la acción principal. */
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
}

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => element.offsetParent !== null);
}

let drawerId = 0;

/**
 * Cajón lateral modal: encabezado con título y cierre, cuerpo con scroll
 * propio y pie de acciones opcional. Mismo motor de accesibilidad que Modal
 * (foco atrapado, restauración del foco, Escape, clic afuera, bloqueo del
 * scroll de la página y portal a document.body). Úsalo para detalles y
 * formularios largos que necesitan contexto de la pantalla de fondo; para
 * una confirmación corta, usa Modal.
 */
@Component({
  selector: 'cs-side-drawer',
  imports: [Button, Icon],
  template: `
    @if (rendered()) {
      <div
        class="cs-side-drawer__mask"
        [class.cs-side-drawer__mask--visible]="visible()"
        (mousedown)="onOverlayMouseDown($event)"
      >
        <aside
          #panel
          class="cs-side-drawer"
          [class.cs-side-drawer--visible]="visible()"
          [class.cs-side-drawer--canvas]="surface === 'canvas'"
          [style.--cs-side-drawer-width]="width + 'px'"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="titleId"
          tabindex="-1"
        >
          <header class="cs-side-drawer__header">
            <h2 class="cs-side-drawer__title" [id]="titleId">{{ title }}</h2>
            <button
              #closeButton
              type="button"
              class="cs-side-drawer__close"
              (click)="requestClose()"
              [attr.aria-label]="closeLabel"
            >
              <cs-icon name="x" [size]="18" aria-hidden="true" />
            </button>
          </header>
          <div class="cs-side-drawer__content"><ng-content /></div>
          @if (primaryAction || secondaryAction) {
            <footer class="cs-side-drawer__footer">
              @if (secondaryAction) {
                <cs-button
                  variant="subtle"
                  size="sm"
                  [disabled]="secondaryAction.disabled ?? false"
                  [loading]="secondaryAction.loading ?? false"
                  (click)="secondaryActionClick.emit()"
                  >{{ secondaryAction.label }}</cs-button
                >
              }
              @if (primaryAction) {
                <cs-button
                  variant="primary"
                  size="sm"
                  [disabled]="primaryAction.disabled ?? false"
                  [loading]="primaryAction.loading ?? false"
                  (click)="primaryActionClick.emit()"
                >
                  @if (primaryAction.icon) {
                    <cs-icon [name]="primaryAction.icon" [size]="16" aria-hidden="true" />
                  }
                  {{ primaryAction.label }}</cs-button
                >
              }
            </footer>
          }
        </aside>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .cs-side-drawer__mask {
        position: fixed;
        inset: 0;
        z-index: var(--elevation-z-index-modal);
        background: var(--color-background-blanket-default);
        opacity: 0;
        transition: opacity var(--motion-duration-medium) var(--motion-easing-default);
      }
      .cs-side-drawer__mask--visible {
        opacity: 1;
      }
      .cs-side-drawer {
        position: absolute;
        top: var(--layout-padding-2xl);
        right: var(--layout-padding-2xl);
        display: flex;
        flex-direction: column;
        width: min(var(--cs-side-drawer-width), calc(100vw - var(--layout-padding-4xl)));
        height: calc(100dvh - var(--layout-padding-2xl) - var(--layout-padding-2xl));
        overflow: hidden;
        border: var(--layout-border-thin) solid var(--color-border-neutral-subtle);
        border-radius: var(--radius-lg);
        background: var(--elevation-surface-default);
        box-shadow: var(--shadow-xl);
        outline: none;
        opacity: 0;
        transform: translateX(calc(100% + var(--layout-padding-2xl)));
        transition:
          transform var(--motion-duration-medium) var(--motion-easing-default),
          opacity var(--motion-duration-medium) var(--motion-easing-default);
      }
      .cs-side-drawer--visible {
        opacity: 1;
        transform: translateX(0);
      }
      /* Lienzo: para contenido con tarjetas o campos blancos encima. */
      .cs-side-drawer--canvas {
        background: var(--color-background-canvas);
      }
      .cs-side-drawer__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--layout-gap-lg);
        padding: var(--layout-padding-lg) var(--layout-padding-2xl);
        border-bottom: var(--layout-border-thin) solid var(--color-border-divider);
      }
      .cs-side-drawer__title {
        margin: 0;
        color: var(--color-text-base-boldest);
        font-family: var(--font-family-heading);
        font-size: var(--font-size-content-highlight);
        line-height: var(--font-line-height-content-highlight);
        font-weight: var(--font-weight-accent);
      }
      .cs-side-drawer__close {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        padding: var(--layout-padding-xs);
        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-base-subtle);
        cursor: pointer;
        transition: color var(--motion-duration-leaving) var(--motion-easing-default);
      }
      .cs-side-drawer__close:hover {
        color: var(--color-text-base-default);
      }
      .cs-side-drawer__close:focus-visible {
        outline: none;
        box-shadow: 0 0 0 var(--layout-border-thick) var(--color-border-focused);
      }
      .cs-side-drawer__content {
        flex: 1;
        overflow-y: auto;
        padding: var(--layout-padding-2xl);
        color: var(--color-text-base-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-ui);
        line-height: var(--font-line-height-content-ui);
      }
      .cs-side-drawer__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--layout-gap-md);
        padding: var(--layout-padding-lg) var(--layout-padding-2xl);
        border-top: var(--layout-border-thin) solid var(--color-border-divider);
      }
      @media (max-width: 767px) {
        .cs-side-drawer {
          top: 0;
          right: 0;
          width: 100%;
          height: 100dvh;
          border: 0;
          border-radius: 0;
          transform: translateX(100%);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .cs-side-drawer,
        .cs-side-drawer__mask {
          transition: none;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SideDrawer implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input({ required: true }) title!: string;
  @Input() closeLabel = 'Cerrar';
  /** Ancho máximo en px; en pantallas de hasta 767 px ocupa todo el ancho. */
  @Input() width = 560;
  /** `canvas` usa el lienzo de la página para contenido con superficies blancas encima. */
  @Input() surface: SideDrawerSurface = 'default';
  @Input() closeOnOverlayClick = true;
  @Input() primaryAction?: SideDrawerAction;
  @Input() secondaryAction?: SideDrawerAction;

  @Output() readonly closed = new EventEmitter<void>();
  @Output() readonly primaryActionClick = new EventEmitter<void>();
  @Output() readonly secondaryActionClick = new EventEmitter<void>();

  @ViewChild('panel') private panelRef?: ElementRef<HTMLElement>;
  @ViewChild('closeButton') private closeButtonRef?: ElementRef<HTMLButtonElement>;

  protected readonly rendered = signal(false);
  protected readonly visible = signal(false);
  protected readonly titleId = `cs-side-drawer-title-${drawerId++}`;

  private previouslyFocused: HTMLElement | null = null;
  private closeTimeout?: ReturnType<typeof setTimeout>;
  private openTimeout?: ReturnType<typeof setTimeout>;
  private originalBodyOverflow = '';
  private portaled = false;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isOpen']) return;
    if (this.isOpen) this.openDrawer();
    else if (!changes['isOpen'].firstChange) this.closeDrawer();
  }

  ngOnDestroy(): void {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    if (this.openTimeout) clearTimeout(this.openTimeout);
    if (this.rendered()) this.unlockScroll();
    this.unportal();
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (!this.isOpen) return;
    if (event.key === 'Escape') {
      this.requestClose();
      return;
    }
    if (event.key !== 'Tab' || !this.panelRef) return;
    const focusable = getFocusable(this.panelRef.nativeElement);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  protected onOverlayMouseDown(event: MouseEvent): void {
    if (this.closeOnOverlayClick && event.target === event.currentTarget) this.requestClose();
  }

  protected requestClose(): void {
    this.closed.emit();
  }

  private openDrawer(): void {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    this.portal();
    this.rendered.set(true);
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    this.originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.openTimeout = setTimeout(() => {
      this.visible.set(true);
      (this.closeButtonRef?.nativeElement ?? this.panelRef?.nativeElement)?.focus();
    });
  }

  private closeDrawer(): void {
    this.visible.set(false);
    this.unlockScroll();
    this.closeTimeout = setTimeout(() => {
      this.rendered.set(false);
      this.unportal();
      this.previouslyFocused?.focus?.();
    }, 200); // --motion-duration-medium
  }

  private portal(): void {
    if (this.portaled) return;
    this.renderer.appendChild(document.body, this.el.nativeElement);
    this.portaled = true;
  }

  private unportal(): void {
    if (!this.portaled) return;
    if (this.el.nativeElement.parentNode === document.body) {
      this.renderer.removeChild(document.body, this.el.nativeElement);
    }
    this.portaled = false;
  }

  private unlockScroll(): void {
    document.body.style.overflow = this.originalBodyOverflow;
  }
}
