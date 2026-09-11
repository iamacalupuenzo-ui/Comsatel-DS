import { Directive, ElementRef, HostListener, OnDestroy, inject } from '@angular/core';
import { gsap } from 'gsap';
import { EASE_DEFAULT } from '../motion/eases';
import { tokenSeconds } from '../motion/token-duration';

/**
 * Feedback de "presionado" para controles interactivos: encoge el elemento
 * mientras el puntero está abajo, igual que whileTap en la referencia React.
 * Las duraciones se leen de los tokens de motion en tiempo real (no quedan
 * copiadas como número suelto) para que sigan un cambio de token sin tocar
 * este archivo.
 */
@Directive({
  selector: '[csPressScale]',
})
export class PressScale implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  @HostListener('pointerdown')
  protected onPress(): void {
    this.animateTo(0.98, '--motion-duration-fast');
  }

  @HostListener('pointerup')
  @HostListener('pointerleave')
  @HostListener('pointercancel')
  protected onRelease(): void {
    this.animateTo(1, '--motion-duration-leaving');
  }

  // Space mantiene la activación de un botón mientras está presionada; Enter
  // dispara su acción al bajar. Ambos reciben el mismo feedback que el puntero
  // sin cancelar ni sustituir el comportamiento nativo del control anfitrión.
  @HostListener('keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (!event.repeat && (event.key === ' ' || event.key === 'Enter')) this.onPress();
  }

  @HostListener('keyup', ['$event'])
  protected onKeyup(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') this.onRelease();
  }

  @HostListener('blur')
  protected onBlur(): void {
    this.onRelease();
  }

  ngOnDestroy(): void {
    gsap.killTweensOf(this.el);
  }

  private animateTo(scale: number, durationToken: '--motion-duration-fast' | '--motion-duration-leaving'): void {
    // Un feedback de escala no comunica información por sí mismo; se omite
    // por completo cuando la persona pidió reducir el movimiento.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.to(this.el, { scale, duration: tokenSeconds(this.el, durationToken), ease: EASE_DEFAULT, overwrite: 'auto' });
  }
}
