import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';
import { gsap } from 'gsap';
import { EASE_DEFAULT } from '../motion/eases';
import { tokenSeconds } from '../motion/token-duration';

/**
 * Anima la altura de un elemento entre 0 y su alto real ('auto') según un
 * booleano — mismo mecanismo que `cs-accordion-item` (CSS puro no puede
 * transicionar a height:auto), extraído a directiva reusable para que
 * cualquier lista que se expanda/colapse dentro de un `@for` (sin una
 * instancia de componente propia por ítem, como el submenú de `cs-menu`) lo
 * consuma sin duplicar el `ViewChild`/`effect()` por ítem.
 */
@Directive({
  selector: '[csCollapse]',
  host: { style: 'display: block; overflow: hidden; height: 0;' },
})
export class Collapse implements OnChanges {
  @Input('csCollapse') expanded = false;

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private animatedOnce = false;

  ngOnChanges(): void {
    if (!this.animatedOnce) {
      // Estado inicial sin animar — evita el flash de abrir/cerrar en el
      // primer render, antes de que el consumidor termine de sincronizar.
      gsap.set(this.el, { height: this.expanded ? 'auto' : 0 });
      this.animatedOnce = true;
      return;
    }
    gsap.to(this.el, {
      height: this.expanded ? 'auto' : 0,
      duration: tokenSeconds(this.el, '--motion-duration-medium'),
      ease: EASE_DEFAULT,
    });
  }
}
