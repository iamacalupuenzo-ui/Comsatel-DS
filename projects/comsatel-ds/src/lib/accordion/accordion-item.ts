import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, effect, signal } from '@angular/core';
import { gsap } from 'gsap';
import { Icon } from '../icons/icon';
import { EASE_DEFAULT } from '../motion/eases';
import { tokenSeconds } from '../motion/token-duration';

/**
 * Fila individual de un `<cs-accordion>` — no maneja su propio estado de
 * abierto/cerrado (eso lo coordina el padre, para poder aplicar exclusión
 * mutua en modo "single"): expone `expanded` (que el padre setea vía
 * `@ContentChildren`) y `toggled` (que el padre escucha para decidir el
 * próximo estado). Ver accordion.ts para el porqué de este reparto.
 */
@Component({
  selector: 'cs-accordion-item',
  imports: [Icon],
  templateUrl: './accordion-item.html',
  styleUrl: './accordion-item.css',
  host: {
    '[class.cs-accordion-item--expanded]': 'expanded()',
  },
})
export class AccordionItem {
  private static nextInstance = 0;

  @Input({ required: true }) id!: string;
  @Input() disabled = false;
  @Output() readonly toggled = new EventEmitter<void>();
  @Output() readonly headerKeydown = new EventEmitter<KeyboardEvent>();

  readonly expanded = signal(false);

  @ViewChild('header', { static: true }) private headerRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('body', { static: true }) private bodyRef!: ElementRef<HTMLElement>;
  /** Evita ids DOM repetidos cuando distintos accordions reutilizan el mismo id de dato. */
  protected readonly domId = `accordion-${AccordionItem.nextInstance++}`;
  private animatedOnce = false;

  constructor() {
    effect(() => {
      const isOpen = this.expanded();
      const el = this.bodyRef.nativeElement;
      if (!this.animatedOnce) {
        // Estado inicial sin animar — evita el flash de abrir/cerrar en el
        // primer render, antes de que el padre termine de sincronizar.
        gsap.set(el, { height: isOpen ? 'auto' : 0 });
        this.animatedOnce = true;
        return;
      }
      // GSAP anima a 'auto' midiendo la altura real del contenido — CSS
      // puro no puede transicionar height:auto, esta es exactamente la
      // razón por la que el sistema aceptó GSAP como motor de motion (ver
      // accessibility-patterns.md sección 9).
      gsap.to(el, { height: isOpen ? 'auto' : 0, duration: tokenSeconds(el, '--motion-duration-medium'), ease: EASE_DEFAULT });
    });
  }

  protected onHeaderClick(): void {
    if (this.disabled) return;
    this.toggled.emit();
  }

  protected onHeaderKeydown(event: KeyboardEvent): void {
    this.headerKeydown.emit(event);
  }

  focusHeader(): void {
    this.headerRef.nativeElement.focus();
  }
}
