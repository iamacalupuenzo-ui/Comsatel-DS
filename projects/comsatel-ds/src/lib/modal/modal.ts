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
import { Button, type ButtonVariant } from '../button/button';
import { Icon } from '../icons/icon';

export type ModalAppearance = 'default' | 'warning' | 'danger';
export type ModalWidthToken = 'sm' | 'md' | 'lg' | 'xl';
export type ModalScrollBehavior = 'body' | 'viewport';

export interface ModalAction {
  label: string;
  disabled?: boolean;
  loading?: boolean;
}

// Sin escala de "ancho de contenedor" en tokens.css — mismos números que el
// Modal de React, porque acá no es un valor de token copiado, es la
// decisión de tamaño de Modal específica ya validada para las dos
// plataformas.
const WIDTH_PX: Record<ModalWidthToken, number> = { sm: 400, md: 560, lg: 720, xl: 960 };

// warning/danger tiñen el título Y el botón principal a la vez — mismo
// criterio que el Modal de React.
const APPEARANCE_BUTTON_VARIANT: Record<ModalAppearance, ButtonVariant> = {
  default: 'primary',
  warning: 'warning',
  danger: 'destructive',
};

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((elem) => elem.offsetParent !== null);
}

let modalIdCounter = 0;

/**
 * Motor de comportamiento/accesibilidad construido a mano — sin PrimeNG ni
 * ninguna otra librería externa (ver PRIMENG_PLAN.md para por qué). Cubre
 * el mismo patrón de "Dialog (Modal)" del WAI-ARIA Authoring Practices
 * Guide que ya implementamos en el Modal de React: foco atrapado dentro
 * del panel, restauración de foco al cerrar, bloqueo de scroll de la
 * página, cierre con Escape y clic afuera, portal a document.body.
 */
@Component({
  selector: 'cs-modal',
  standalone: true,
  imports: [Button, Icon],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  // El host (<cs-modal>) se reubica físicamente a document.body al abrir
  // (ver portal()) — la encapsulación emulada de Angular scopea el CSS al
  // componente dueño del template, así que este componente sigue
  // aplicando su propio CSS sin problema (a diferencia del piloto con
  // PrimeNG, acá NO hace falta ViewEncapsulation.None: el nodo que se
  // mueve es el host completo del propio componente, con su CSS scopeado
  // viajando pegado a él).
  encapsulation: ViewEncapsulation.Emulated,
})
export class Modal implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input({ required: true }) title!: string;
  @Input() appearance: ModalAppearance = 'default';
  @Input() width: ModalWidthToken | number = 'md';
  @Input() hasCloseButton = true;
  @Input() closeLabel = 'Cerrar';
  @Input() scrollBehavior: ModalScrollBehavior = 'body';
  @Input() closeOnOverlayClick = true;
  @Input() primaryAction?: ModalAction;
  @Input() secondaryAction?: ModalAction;
  /** A qué elemento enfocar al abrir en vez del botón de cerrar. */
  @Input() initialFocusRef?: ElementRef<HTMLElement>;

  @Output() closed = new EventEmitter<void>();
  @Output() primaryActionClick = new EventEmitter<void>();
  @Output() secondaryActionClick = new EventEmitter<void>();

  @ViewChild('panel') private panelRef?: ElementRef<HTMLDivElement>;
  @ViewChild('closeBtn') private closeBtnRef?: ElementRef<HTMLButtonElement>;

  // signal(), no una propiedad plana: esta app Angular corre SIN zone.js
  // (zoneless por defecto, confirmado — no está en package.json). Una
  // propiedad plana mutada dentro de un setTimeout (ver openModal/
  // closeModal) nunca dispara una nueva pasada de detección de cambios ahí
  // — el valor cambia en memoria pero la vista nunca se entera. signal()
  // sí notifica a Angular sin importar si el cambio vino de un evento
  // ligado por Angular o de un timer suelto. Bug real encontrado probando
  // la transición de entrada en el navegador: la clase --visible nunca se
  // aplicaba pese a que el foco (efecto imperativo, no ligado a CD) sí
  // funcionaba correctamente en el mismo callback.
  /** Montado en el DOM (incluye la salida animada). */
  protected readonly rendered = signal(false);
  /** Dispara la transición CSS de entrada/salida. */
  protected readonly visible = signal(false);
  protected readonly titleId = `cs-modal-title-${modalIdCounter++}`;

  private previouslyFocused: HTMLElement | null = null;
  private closeTimeout?: ReturnType<typeof setTimeout>;
  private openTimeout?: ReturnType<typeof setTimeout>;
  private originalBodyOverflow = '';
  private portaled = false;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isOpen']) return;
    if (this.isOpen) this.openModal();
    else this.closeModal();
  }

  ngOnDestroy(): void {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    if (this.openTimeout) clearTimeout(this.openTimeout);
    this.unlockScroll();
    this.unportal();
  }

  protected get widthPx(): number {
    return typeof this.width === 'number' ? this.width : WIDTH_PX[this.width];
  }

  protected get primaryVariant(): ButtonVariant {
    return APPEARANCE_BUTTON_VARIANT[this.appearance];
  }

  private openModal(): void {
    if (this.closeTimeout) clearTimeout(this.closeTimeout);
    this.portal();
    this.rendered.set(true);
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    this.lockScroll();
    // Un tick después: fuerza el reflow entre "montado en opacity 0" y
    // "clase --visible aplicada" para que la transición CSS anime en vez
    // de saltar directo al estado final.
    this.openTimeout = setTimeout(() => {
      this.visible.set(true);
      const target = this.initialFocusRef?.nativeElement ?? this.closeBtnRef?.nativeElement ?? this.panelRef?.nativeElement;
      target?.focus();
    });
  }

  private closeModal(): void {
    this.visible.set(false);
    this.unlockScroll();
    this.closeTimeout = setTimeout(() => {
      this.rendered.set(false);
      this.unportal();
      this.previouslyFocused?.focus?.();
    }, 200); // var(--motion-duration-medium)
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

  private lockScroll(): void {
    this.originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll(): void {
    document.body.style.overflow = this.originalBodyOverflow;
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(e: KeyboardEvent): void {
    if (!this.isOpen) return;
    if (e.key === 'Escape') {
      this.requestClose();
      return;
    }
    if (e.key !== 'Tab' || !this.panelRef) return;
    const focusable = getFocusable(this.panelRef.nativeElement);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  protected onOverlayMouseDown(e: MouseEvent): void {
    if (this.closeOnOverlayClick && e.target === e.currentTarget) this.requestClose();
  }

  protected requestClose(): void {
    this.closed.emit();
  }
}
