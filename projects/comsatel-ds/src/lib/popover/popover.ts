import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  signal,
} from '@angular/core';
import { computePopoverPosition, type PopoverPlacement } from './popover-position';

export type { PopoverPlacement, PopoverSide, PopoverAlign } from './popover-position';

let nextPopoverId = 0;

/**
 * Primitivo genérico de posicionamiento flotante — la base para construir
 * Select/Spotlight/Menu/cualquier panel que deba "flotar" junto a un
 * trigger. Motor de comportamiento 100% a mano (ver B14 en SKILL.md):
 * portal a document.body, cierre con Escape/clic afuera, animación de
 * entrada/salida con el patrón de dos signals — mismos patrones que Modal,
 * documentados en accessibility-patterns.md. Lo único nuevo acá es el
 * cálculo de posición (computePopoverPosition): mide el panel real y
 * voltea de lado cuando no entra en vez de salirse de la pantalla.
 */
@Component({
  selector: 'cs-popover',
  templateUrl: './popover.html',
  styleUrl: './popover.css',
})
export class Popover implements OnChanges, OnDestroy {
  @Input() isOpen = false;
  @Input() id = `cs-popover-${++nextPopoverId}`;
  /** El elemento (o ElementRef) que abre el popover. Nunca cuenta como
   * "afuera" al cerrar por clic — el propio (click) del trigger decide si
   * vuelve a abrirlo, sin que el cierre por clic-afuera se lo pise. */
  @Input() triggerRef: ElementRef<HTMLElement> | HTMLElement | null = null;
  @Input() placement: PopoverPlacement = 'bottom-start';
  @Input() offset = 8;
  /** Iguala el ancho del panel al del trigger — el caso típico de un
   * combobox/select construido sobre este primitivo. */
  @Input() matchTriggerWidth = false;
  /** Rol semántico del contenedor flotante. Los consumidores que ya
   * exponen un rol compuesto propio (por ejemplo, listbox) pueden omitirlo. */
  @Input() role: string | null = 'dialog';
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledBy: string | null = null;
  @Input() closeOnOverlayClick = true;
  /** Quita el marco propio del panel (borde/fondo/radio/sombra) — para un
   * consumidor cuyo contenido proyectado ya trae su propia superficie
   * visual (ej. un tooltip oscuro) y solo necesita de Popover el
   * posicionamiento/portal/animación/cierre, no un segundo marco encima. */
  @Input() bare = false;
  @Output() readonly closed = new EventEmitter<void>();

  @ViewChild('panel') private panelRef?: ElementRef<HTMLElement>;

  protected readonly rendered = signal(false);
  protected readonly visible = signal(false);
  protected readonly pos = signal<{ top: number; left: number; width?: number } | null>(null);

  private portaled = false;
  private openTimeout?: ReturnType<typeof setTimeout>;
  private closeTimeout?: ReturnType<typeof setTimeout>;
  private listenersActive = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isOpen']) return;
    if (this.isOpen) this.openPopover();
    else this.closePopover();
  }

  ngOnDestroy(): void {
    this.syncTriggerAttributes(false);
    this.unportal();
    clearTimeout(this.openTimeout);
    clearTimeout(this.closeTimeout);
    this.removeListeners();
  }

  private openPopover(): void {
    clearTimeout(this.closeTimeout);
    this.portal();
    this.rendered.set(true);
    this.openTimeout = setTimeout(() => {
      this.reposition();
      this.visible.set(true);
      this.syncTriggerAttributes(true);
      this.addListeners();
    });
  }

  private closePopover(): void {
    clearTimeout(this.openTimeout);
    this.visible.set(false);
    this.syncTriggerAttributes(false);
    this.removeListeners();
    this.closeTimeout = setTimeout(() => {
      this.rendered.set(false);
      this.pos.set(null);
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

  private resolvedTrigger(): HTMLElement | null {
    if (!this.triggerRef) return null;
    return this.triggerRef instanceof ElementRef ? this.triggerRef.nativeElement : this.triggerRef;
  }

  /** `cs-button` encapsula un botón nativo. La relación ARIA y el retorno
   * de foco deben vivir en ese elemento enfocable, no solo en su host. */
  private accessibleTrigger(): HTMLElement | null {
    const trigger = this.resolvedTrigger();
    return trigger?.querySelector<HTMLElement>('button, [tabindex]:not([tabindex="-1"])') ?? trigger;
  }

  private reposition = (): void => {
    const trigger = this.resolvedTrigger();
    const panel = this.panelRef?.nativeElement;
    if (!trigger || !panel) return;
    const triggerRect = trigger.getBoundingClientRect();
    const panelSize = { width: panel.offsetWidth, height: panel.offsetHeight };
    const next = computePopoverPosition(triggerRect, panelSize, this.placement, this.offset);
    this.pos.set({ ...next, width: this.matchTriggerWidth ? triggerRect.width : undefined });
  };

  private onPointerDown = (e: MouseEvent): void => {
    const target = e.target as Node;
    const panel = this.panelRef?.nativeElement;
    const trigger = this.resolvedTrigger();
    if (panel?.contains(target)) return;
    if (trigger?.contains(target)) return;
    if (this.closeOnOverlayClick) this.closed.emit();
  };

  private onKeydown = (e: KeyboardEvent): void => {
    if (e.key !== 'Escape') return;
    e.preventDefault();
    this.accessibleTrigger()?.focus();
    this.closed.emit();
  };

  private syncTriggerAttributes(open: boolean): void {
    const trigger = this.accessibleTrigger();
    if (!trigger) return;
    this.renderer.setAttribute(trigger, 'aria-expanded', String(open));
    this.renderer.setAttribute(trigger, 'aria-controls', this.id);
    if (this.role) this.renderer.setAttribute(trigger, 'aria-haspopup', this.role);
  }

  private addListeners(): void {
    if (this.listenersActive) return;
    window.addEventListener('resize', this.reposition);
    window.addEventListener('scroll', this.reposition, true);
    document.addEventListener('mousedown', this.onPointerDown);
    document.addEventListener('keydown', this.onKeydown);
    this.listenersActive = true;
  }

  private removeListeners(): void {
    if (!this.listenersActive) return;
    window.removeEventListener('resize', this.reposition);
    window.removeEventListener('scroll', this.reposition, true);
    document.removeEventListener('mousedown', this.onPointerDown);
    document.removeEventListener('keydown', this.onKeydown);
    this.listenersActive = false;
  }
}
