import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';
import { gsap } from 'gsap';
import { EASE_DEFAULT } from '../motion/eases';
import { prefersReducedMotion, tokenSeconds } from '../motion/token-duration';

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
  host: {
    style: 'display: block; overflow: hidden; height: 0;',
    // Altura 0 no oculta nada al lector de pantalla ni saca los controles del
    // orden de foco: mismo criterio que el panel de `cs-accordion-item`.
    '[attr.inert]': 'expanded ? null : ""',
    '[attr.aria-hidden]': 'expanded ? null : "true"',
  },
})
export class Collapse implements OnChanges {
  @Input('csCollapse') expanded = false;

  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  private animatedOnce = false;

  ngOnChanges(): void {
    const height = this.expanded ? 'auto' : 0;
    // El primer render no anima (evita el flash antes de que el consumidor
    // sincronice), y tampoco se anima si la persona pidió reducir el movimiento.
    if (!this.animatedOnce || prefersReducedMotion()) {
      gsap.set(this.el, { height, overwrite: true });
      this.animatedOnce = true;
      return;
    }
    gsap.to(this.el, {
      height,
      duration: tokenSeconds(this.el, '--motion-duration-medium'),
      ease: EASE_DEFAULT,
    });
  }
}
